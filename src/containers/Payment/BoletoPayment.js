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

const BoletoCheckout = ({ checkoutInfo, user, address, status, setStatus, orderParams, createOrder }) => {
  const stripe = useStripe({ location: 'pt-BR' });
  const elements = useElements({ location: 'pt-BR' });

  const onSubmit = async (event) => {
    if (!stripe || !elements) {
      return;
    }
      const params = {
        ...checkoutInfo,
        payment_method_types: ['boleto'],
        receipt_email: 'duarterogerpeixoto@gmail.com',
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
            const { paymentIntent } = confirmRes
            
            const newOrder = {
              ...orderParams,
              payment_id: paymentIntent.id,
              payment_method: 'boleto',
              payment_status: 0,
              boleto_pdf: paymentIntent.next_action.boleto_display_details.pdf,
            }
            createOrder(newOrder)
          }).catch((err) => {
            setStatus('error')
          });
        }
      }).catch((err) => {
        setStatus('error')
      })
  };
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

export default BoletoCheckout