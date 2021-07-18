import React from 'react'
import http from '../../utils/http'
import { Link } from 'gatsby'
import { useStripe, useElements } from '@stripe/react-stripe-js';

import Loading from '../../components/loading'
import BoletoInfo from '../../components/checkout/boletoInfo'
import { FormArea } from '../../components/form/form.styles'
import { spanCss, spanTitleCss } from '../User/UserContainer.styles'

const createPaymentIntent = (params) => {
  const paymentIntentUrl = '/payment_intent'
  return http.post(paymentIntentUrl, { ...params })
}

const BoletoPaymentProgress = ({ status }) => {
  const message = {
    'create': {
      title: "Criando pagamento"
    },
    'confirm': {
      title: "Confirmando pagamento"
    },
    'finish': {
      title:"Pedido feito!",
      message: "Pague seu boleto para concluir a compra!"
    },
    'error': {
      title: 'Erro ao processar pagamento',
      message: 'Por favor tente novamente'
    }
  }
  return(
    <div
      style={{ display: 'grid' }}
    >
      <span css={spanTitleCss} > {message[status]['title']} </span>
      <span css={spanCss}>{message[status]?.message}</span>
      {
        status === 'finish' && (
          <>
          <Link css={spanCss} to='/' > Ver resumo do pedido </Link>
          <Link css={spanCss} to='/' > Ir para meus pedidos </Link>
          </>
        )
      }
      {
        status !== 'error' && status !== 'finish' && (
          <Loading />
        )
      }
      {
        status === 'error' && (
          <Link css={spanCss} to='/' > Voltar para o carrinh </Link>

        )
      }

    </div>
  )
}

const Checkout = ({ checkoutInfo, user, address, status, setStatus }) => {
  const stripe = useStripe({ location: 'pt-BR' });
  const elements = useElements({ location: 'pt-BR' });

  const onSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }
      const params = {
        ...checkoutInfo,
        payment_method_types: ['boleto']
      }

      await createPaymentIntent(params).then(async res => {
        if(res.status === 200) {
          setStatus('confirm')
          const { client_secret } = res.data
          await stripe.confirmBoletoPayment(
          client_secret,
          {
            payment_method: {
              billing_details: {
                address: {
                  country: 'BR',
                  state: address.state.substring(0,2),
                  city: address.city,
                  postal_code: address.cep,
                  line1: `${address.street} - ${address.number} ${address?.complement}`, 
                },
                name: user.name,
                email: user.email,
              },
              boleto: {
                tax_id: user.document,
              },
            },
          }
        ).then(confirmRes => {
           setStatus('finish')
            console.log('confirmRes', confirmRes)
            const { paymentIntent } = confirmRes
            console.log('payment intent', paymentIntent)
          }).catch((err) => {
            console.log('[error 3]', err);
            setStatus('error')
          });
        }
      }).catch((err) => {
        console.log('[error 2]', err);
        setStatus('error')
      })
  };
  console.log('address', address, 'status', status)
  return (
    <FormArea style={{ margin: 0, textAlign: 'initial' }}>
      { address === undefined ? (
        <span css={spanCss}>
          Para utilizar o pagamento em boleto, favor selecionar um endereço
        </span>
        ) :
        !Boolean(status)
        ? (
          <BoletoInfo onSubmit={onSubmit} user={user} address={address} />
        )
        :(
          <BoletoPaymentProgress status={status} />
        )
      }
    </FormArea>
  )
}

export default Checkout