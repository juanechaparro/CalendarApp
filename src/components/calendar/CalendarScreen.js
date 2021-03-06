import React, { useEffect, useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'
import { Navbar } from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { useSelector } from 'react-redux';
import { DeleteEventFav } from '../ui/DeleteEventFav';


moment.locale('es');

const localizer = momentLocalizer(moment);

// const events = [{
//   title: 'Cumpleaños del jefe',
//   start: moment().toDate(),// sinonimo de new date()
//   end: moment().add(2, 'hours').toDate(),
//   bgcolor: '#fafafa',
//   notes:'Comprar el pastel',
//   user:{
//     _id: '123',
//     name: 'juan'
//   }
// }]

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  
  

  const {events,activeEvent}= useSelector(state => state.calendar);
  
  const {uid}= useSelector(state => state.auth);
  
  
 
  const [lastView, setLastView] = useState(localStorage.getItem('lastView' || 'month'));
  useEffect(() => {
    dispatch(eventStartLoading());
    
  }, [dispatch])
  const onDoubleCLick = (e)=>{
   
    dispatch(uiOpenModal());
  }
  const onSelectEvent = (e)=>{
    
    dispatch(eventSetActive(e));
   
  }
  const onViewChange = (e)=>{
    setLastView(e);
    localStorage.setItem('lastView', e );
  }
  const onSelectedSlot = (e)=>{
    console.log(e)
    dispatch(eventClearActiveEvent());
    
  }
  const eventStyleGetter = (event, start, end , isSelected)=>{
      console.log(event, start, end , isSelected);

      const style ={
        backgroundColor :(uid === event.user._id) ?'#367CF7' : '#4656660',
        borderRadius: '0px',
        opacity: 0.8,
        display:'block',
        color : 'white'

      }
      return{
        style
      }
  };
  return (
  
    <div className='calendar-screen'>
        <Navbar/>

        <Calendar
          localizer={localizer}
          events={ events }
          startAccessor="start"
          endAccessor="end"
          messages = {messages}
          eventPropGetter  ={eventStyleGetter}
          components ={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={onDoubleCLick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          view={ lastView || 'month' }
          onSelectSlot={onSelectedSlot}
          
          selectable ={true}
    />
    <AddNewFab/>
    {activeEvent && <DeleteEventFav/>}
    
    <CalendarModal/>

    </div>
  )
}
