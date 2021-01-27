import React from 'react';
import DayListItem from'components/DayListItem.jsx';
import 'components/DayListItem.scss';

export default function DayList(props) {
  

const  DayListData  = props;
let ParsedDayList = [];

if (Array.isArray(DayListData.days)) {
  ParsedDayList = DayListData.days.map(day => 
  <DayListItem key={day.id} name={day.name} spots={day.spots} selected={day.name === props.day} setDay={props.setDay} />)
}

  return (
    <ul>
    {ParsedDayList }
    </ul>
  )
}