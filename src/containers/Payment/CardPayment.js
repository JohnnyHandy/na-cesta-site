import React from 'react'
import http from '../../utils/http'
import { Link } from 'gatsby'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardForm from '../../components/form/CardForm'
import Loading from '../../components/loading/index'
import { FormArea } from '../../components/form/form.styles'
import { spanCss, spanTitleCss } from '../User/UserContainer.styles'

const createPaymentIntent = (params) => {
  const paymentIntentUrl = '/payment_intent'
  return http.post(paymentIntentUrl, { ...params })
}

const CardPaymentProgress = ({ status }) => {
  const message = {
    'authorize': {
      title: 'Autorizando pagamento',
    },
    'create': {
      title: "Criando pagamento"
    },
    'confirm': {
      title: "Confirmando pagamento"
    },
    'finish': {
      title:"Pagamento concluído!",
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

const Checkout = ({ checkoutInfo, user, status, setStatus }) => {
  console.log('status', status)
  const stripe = useStripe({ location: 'pt-BR' });
  const elements = useElements({ location: 'pt-BR' });

  const onSubmit = async (event) => {
    setStatus('authorize')

    // We don't want to let default form submission happen here,
    // which would refresh the page.

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error 1]', error);
      setStatus('error')
    } else {
      setStatus('create')
      const { id } = paymentMethod
      const params = {
        ...checkoutInfo,
        payment_method: id
      }
      await createPaymentIntent(params).then(async res => {
        if(res.status === 200) {
          setStatus('confirm')
          const { client_secret } = res.data
         await stripe.confirmCardPayment(
            client_secret,
            {
              payment_method: {
                card: cardElement,
                billing_details: {
                  name: user.name ,
                },
              },
            }
          ).then(confirmRes => {
            setStatus('finish')
            console.log('confirmRes', confirmRes)
            const { paymentIntent } = res.data
            console.log('paymentIntent', paymentIntent)
          }).catch((err) => {
            console.log('[error 3]', err);
            setStatus('error')
          });
        }
      }).catch((err) => {
        console.log('[error 2]', err);
        setStatus('error')
      })
    }
  };
  return (
    <FormArea>
      {
        status !== 'finished'
        && (
          <CardForm stripe={stripe} onSubmit={onSubmit} />
          )
        }
        {Boolean(status) && <CardPaymentProgress status={status} />}
    </FormArea>
  )
}

export default Checkout