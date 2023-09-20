
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import Dropzone from 'react-dropzone';


function Chatbot() {
  const steps = [
    {
      id: 'Great',
      message: 'Hello, Welcome to legalease',
      trigger: 'Ask Name',
    },
    {
      id: 'Ask Name',
      message: 'Please enter your name',
      trigger: 'Name',
    },
    {
      id: 'Name',
      user: true,
      trigger: 'SelectService',
    },
    {
      id: 'SelectService',
      message: 'Hi {previousValue}, Please select the service you want',
      trigger: 'IssueService',
    },
    {
      id:'IssueService',
      options: [
        { value: 'Select Services', label:'Select Services', trigger: 'Select Services' },
        { value: 'Upload FIR', label: 'Upload FIR', trigger: 'Upload FIR' },
        { value: 'Issue with services', label: 'Issue with services', trigger:'Issue with services' },
        { value: 'Issue with portal', label: 'Issue with portal', trigger: 'Issue with portal' },
      ],
    },
    {
      id:'Issue with portal',
      message:"Enter your issue with the portal",
      trigger:'entertext',
    },
    {
      id:'entertext',
      user:true,
      trigger:"personalinfo",
    },
    {
      id:'Issue with services',
      message:"Enter your issue with the services",
      trigger:'entertext',
    },
    {
      id:'entertext',
      user:true,
      trigger:"personalinfo",
    },
    {
      id: 'Upload FIR',
      component: (
        <div>
          <Dropzone>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <button>click to select image</button>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        
      ),
      // waitAction: true,
      trigger:"personalinfo",
      waitAction: true,
    },
    {
      id: 'Select Services',
      options: [
        { value: 'Advocate', label: 'Advocate', trigger: 'Advocate' },
        { value: 'Meadiator', label: 'Meadiator', trigger: 'Meadiator' },
        { value: 'Arbitrator', label: 'Arbitrator', trigger: 'Arbitrator' },
        { value: 'Notary', label: 'Notary', trigger: 'Notary' },
      ],
    },
    ///Advocates
    {
      id: 'Advocate',
      options: [
        { value: 'Criminal Lawyer', label: 'Criminal Lawyer', trigger: 'Criminal Lawyer' },
        { value: 'Corporate Lawyer', label: 'Corporate Lawyer', trigger: 'Corporate Lawyer' },
        { value: 'Tax Lawyer', label: 'Tax Lawyer', trigger: 'Tax Lawyer' },
        { value: 'Revenue Lawyer', label: 'Revenue Lawyer', trigger: 'Revenue Lawyer' },
        { value: 'Civil Lawyer', label: 'Civil Lawyer', trigger: 'Civil Lawyer' },
      ],
    },

    {
      id: 'Criminal Lawyer',
      message: 'You have selected for a Criminal Lawyer',
      trigger:'infochoice',
    },
    
    {
      id: 'Corporate Lawyer',
      message: 'You have selected for a Corporate Lawyer',
      trigger:'infochoice',
    },
    {
      id: 'Tax Lawyer',
      message: 'You have selected for a Tax Lawyer',
      trigger:'infochoice',
    },
    {
      id: 'Revenue Lawyer',
      message: 'You have selected for a Revenue Lawyer',
      trigger:'infochoice',
    },
    {
      id: 'Civil Lawyer',
      message: 'You have selected for a Civil Lawyer',
      trigger:'infochoice',
    },

    // mediator
    {
      id: 'Meadiator',
      options: [
        { value: 'Facilitative', label: 'Facilitative', trigger: 'Facilitative' },
        { value: 'Evaluative', label: 'Evaluative', trigger: 'Evaluative' },],
    },
    {
      id: 'Facilitative',
      message: 'You have selected for a Facilitative Meadiator',
      trigger:'infochoice',
    },
    {
      id: 'Evaluative',
      message: 'You have selected for a Evaluative Meadiator',
      trigger:'infochoice',
    },

    // Arbitrator
    {
      id: 'Arbitrator',
      options: [
        { value: 'Domestic', label: 'Domestic', trigger: 'Domestic' },
        { value: 'Fast track', label: 'Fast track', trigger: 'Fast track' },
        { value: 'Ad-hoc', label: 'Ad-hoc', trigger: 'Ad-hoc' },],
    },
    {
      id: 'Domestic',
      message: 'You have selected for a Domestic Arbitrator',
      trigger:'infochoice',
    },
    {
      id: 'Fast track',
      message: 'You have selected for a Fast track Arbitrator',
      trigger:'infochoice',
    },
    {
      id: 'Ad-hoc',
      message: 'You have selected for a Evaluative Arbitrator',
      trigger:'infochoice',
    },

    // Notary
    {
      id: 'Notary',
      message: 'You have selected for Notary',
      trigger:'infochoice',
    },

    /// end part 

    
    {
      id:"infochoice",
      message:"enter the ratings ",
      trigger:"ratings",
    },
    { 
      id:'ratings',
      options: [
        { value: '3+', label: '3+', trigger: 'experience' },
        { value: '3.5+', label: '3.5+', trigger: 'experience' },
        { value: '4+', label: '4+', trigger: 'experience' },
        { value: '4.5+', label: '4.5+', trigger: 'experience' },
      ],
    },
    {
      id:'experience',
      message:'enter years of experience',
      trigger:'experiencechoice',
    },
    {
      id:'experiencechoice',
      options: [
        { value: 'Below 5', label: 'Below 5', trigger: 'personalinfo' },
        { value: '5+', label: '5+', trigger: 'personalinfo' },
        { value: '10+', label: '10+', trigger: 'personalinfo' },
        { value: '15+', label: '15+', trigger: 'personalinfo' },
        { value: '20+', label: '20+', trigger: 'personalinfo' },
      ],
    },
    {
      id:"personalinfo",
      message:"Would you like to share your contact informations ?",
      trigger:'choice',
    },
    {
      id:'choice',
      options:[
        { value: 'yes', label: 'yes', trigger: 'yes' },
        { value: 'no', label: 'no', trigger: 'choice2' },],
    },
    {
      id :'no',
      message :"Have a good day 😊 ",
       end:true,
    },
    {
      id:'yes',
      message:'Enter phone number',
      trigger:'info',
    },
    {
      id:'info',
      user:true,
      trigger:'phone',
    },
    {
       id:'phone',
       message:"the number you entered is : {previousValue} . \n\n Enter your Email.id",
       trigger:'emailinfo',
    },
    {
      id:'emailinfo',
      user:true,
      trigger:'email'
    },
    {
      id:'email',
      message:'Your entered email is {previousValue} . \n\n I will share this with my team. 😊 \n\n',
      trigger:'choice2',
    },
    { 
       id:'choice2',
       message:" Should I help you further ?",
       trigger:'choice3'
    },
    {
      id:'choice3',
      options:[
        { value: 'yes', label: 'yes', trigger: 'IssueService' },
        { value: 'no', label: 'no', trigger: 'no' },],
    }
    
  ];
 
  return (
    <div style={{ position:"fixed",bottom:"10px", right:"10px" }}>
        <div style={{ maxWidth: "400px" }}>
          <ChatBot
            steps={steps}
          />
        </div>
      </div>
  );
}

export default Chatbot;

// import React from 'react';
// import Dropzone from 'react-dropzone';

// const App = {
//   initialMessages: [
//     {
//       id: 'welcome',
//       message: 'Welcome to my chatbot!',
//       trigger: 'userInput',
//     },
//     {
//       id: 'userInput',
//       user: true,
//       trigger: 'storeInput',
//     },
//     {
//       id: 'storeInput',
//       message: 'Thanks for your input! I will store it in my database.',
//       trigger: 'uploadImage',
//     },
//     {
//       id: 'uploadImage',
//       message: 'Please upload an image:',
//       trigger: 'getImage',
//     },
//     {
//       id: 'getImage',
//       component: (
//         <div>
//           <Dropzone>
//             {({ getRootProps, getInputProps }) => (
//               <section>
//                 <div {...getRootProps()}>
//                   <input {...getInputProps()} />
//                   <p>Drag and drop an image here, or click to select an image</p>
//                 </div>
//               </section>
//             )}
//           </Dropzone>
//         </div>
//       ),
//       waitAction: true,
//     },
//   ],
//   widgets: {
//     header: {
//       widgetName: 'header',
//       widgetFunc: ({}) => <div>My Chatbot</div>,
//     },
//   },
// };

// export default App;


