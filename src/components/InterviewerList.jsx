import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem.jsx';
import PropTypes from 'prop-types';
import 'components/InterviewerList.scss';
import 'components/InterviewerListItem.scss';

export default function InterviewerList(props) {
  let interviewerData = props.interviewers;
    let ParsedInterviewList = [];

  if (Array.isArray(interviewerData)) {
    ParsedInterviewList = interviewerData.map(interviewer => 
      <InterviewerListItem 
      key={interviewer.id} 
      name={interviewer.name} 
      avatar={interviewer.avatar} 
      selected={interviewer.id === props.interviewer} 
      setInterviewer={event => props.setInterviewer(interviewer.id)}
      />)
  }
 
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {ParsedInterviewList}
      </ul>
    </section>
  )
  
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

