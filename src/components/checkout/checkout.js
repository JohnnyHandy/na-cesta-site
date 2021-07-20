import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { useDispatch } from 'react-redux'

import CardForm from '../../containers/Payment/CardPayment'
import BoletoInfo from '../../containers/Payment/BoletoPayment'
import { FormArea } from '../../components/form/form.styles'
import { CREATE_ORDER_REQUEST } from '../../store/orders'
import 'react-tabs/style/react-tabs.css';

const Checkout = (props) => {
  const [status, setStatus] = React.useState('');
  const dispatch = useDispatch();
  const createOrder = (params) => dispatch(CREATE_ORDER_REQUEST(params))
  return (
    <FormArea style={{ margin: 0, textAlign: 'initial' }}>
      <Tabs>
        <TabList>
          <Tab> Cartão de Crédito </Tab>
          <Tab> Boleto </Tab>
        </TabList>
        <TabPanel>
          <CardForm
            status={status}
            setStatus={setStatus}
            createOrder={createOrder}
            {...props}
          />
        </TabPanel>
        <TabPanel>
          <BoletoInfo
            status={status}
            createOrder={createOrder}
            setStatus={setStatus}          
            {...props}
          />
        </TabPanel>
      </Tabs>
    </FormArea>
  )
}

export default Checkout