const OrderIndex = ({orders})=>{
    return <ul>
        {orders.map(order=>{
            return <li key={order.id}>
            <div className="ticketDiv">
   <widget type="ticket" class="--flex-column"> 
   <div class="top --flex-column">
      <div class="deetz --flex-row-j!sb">
         <div class="event --flex-column">
            <div class="date">{order.ticket.title}</div>
            <div class="location -bold">Bahceli, Ankara</div>
         </div>
         <div class="price --flex-column">
            <div class="label">Status</div>
            <div class="cost -bold">{order.status}</div>
         </div> 
      </div> 
   </div>
   <div class="rip"></div>
   <div class="bottom --flex-row-j!sb">
    <div className="barcode"></div>
     <div>

     </div>
   </div>
</widget>
 </div>
            </li>
        })}
    </ul>
}

OrderIndex.getInitialProps = async (context,client)=>{
    const {data} = await client.get('/api/orders');
    return {orders:data};
}

export default OrderIndex;
