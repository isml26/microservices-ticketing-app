import Router from "next/router";
import useRequest from "../../hooks/use-request";

const TicketShow = ({ticket})=>{
   const {doRequest,errors} = useRequest({
       url:'/api/orders',
       method:'post',
       body:{
           ticketId:ticket.id
       },
       onSuccess:(order)=>Router.push('/orders/[orderId]',`/orders/${order.id}`)
   })

   return (
    <div className="ticketDiv">
   <widget type="ticket" class="--flex-column"> 
   <div class="top --flex-column">
      <div class="bandname -bold">{ticket.title}</div>
      <div class="deetz --flex-row-j!sb">
         <div class="event --flex-column">
            <div class="date">19 September 2022</div>
            <div class="location -bold">Bahceli, Ankara</div>
         </div>
         <div class="price --flex-column">
            <div class="label">Price</div>
            <div class="cost -bold">{ticket.price}$</div>
         </div> 
      </div> 
   </div>
   <div class="rip"></div>
   <div class="bottom --flex-row-j!sb">
    <div className="barcode"></div>
      <button  className="buy" onClick={()=>doRequest()} >Purchase</button>
     <div>
     </div>
   </div>
   {errors}
</widget>

 </div>
   )

}
TicketShow.getInitialProps = async(context,client)=>{
    const {ticketId} = context.query;
    const {data} = await client.get(`/api/tickets/${ticketId}`)
    return {ticket:data};
}



export default TicketShow;