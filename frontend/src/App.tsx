import React, {useEffect} from 'react';
import './App.css';
import { Box, Grid, Paper } from '@mui/material';
import { Input, Button, Sheet, List, ListItem, ListItemDecorator, Avatar } from '@mui/joy';
import { styled } from '@mui/material/styles';
import Message from '@mui/icons-material/Message';
import chatbotImage from './assets/chatbotImage.jpg';
import { ApiFunction } from './helper/ApiFunction';
import Typewriter from 'typewriter-effect';

interface dialogType {
    type: 'bot' | 'user',
    text: String
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: '#e5e5e5',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: 150
}));


function App() {
  var [dialogData, setDialogData] = React.useState<dialogType[]>([{ type: 'bot', text: "Hi I am Chatbot I have some question about cats." }]);
  var [answerText, setAnswerText] = React.useState("");


    
  var talkWithChatbot = async () => {
         const response = await ApiFunction("dialog", { "answerText": answerText }, "post");
           var tempArray = dialogData;
           var temp: dialogType  = {
             type: 'bot',
             text: response?.data.text.toString()
           };
           tempArray.push(temp);
           setDialogData([...tempArray]); 
  }

  var destroySession = async () =>{
       await ApiFunction("destroySession", {}, "post");
  }

  window.addEventListener("beforeunload", async (ev: any)  => // if browser close session should be end
  {  
    await destroySession();
  });

  
  useEffect(() => {
    async function fetchMyAPI() {
      await talkWithChatbot();
    }
    setTimeout(function(){
      fetchMyAPI()
    }, 9000);
    
  },[]);

  async function textAction() {
    if(answerText !== ""){
      var tempArray = dialogData;
      var temp: dialogType  = {
        type: 'user',
        text: answerText
      };
      tempArray.push(temp);
      dialogData = tempArray;
      setDialogData([...tempArray]);
    }
    await talkWithChatbot();
    setAnswerText("");
  }

  return (
    <div className="App">
    <Box sx={{ flexGrow: 1, paddingTop: 10 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={8}>
                <Item>
                      <Grid container spacing={2}>
                        <Grid item xs={12} style={{ minHeight: 700 }}>
                               <Sheet
                                  variant="outlined"
                                  sx={{ width: '100%', backgroundColor: 'ghostwhite', minHeight: 700 , maxHeight: 700, overflow: 'auto', borderRadius: 'sm' }}
                                >
                                  <List>
                                          {dialogData.map((item, index) => (
                                            <ListItem key={index}>
                                              <ListItemDecorator>
                                                 <Avatar size="lg" src={item.type === 'bot' ? chatbotImage : ''} /> 
                                                 <p> {item.type === 'bot' ? (
                                                          <Typewriter
                                                             onInit={(typewriter) => {
                                                               typewriter.typeString(( item.type === 'bot' ? (" " +"Chatbot" + " : " + item.text.toString()) : (" ")))
                                                                 .start();
                                                             }}
                                                           />) 
                                                           :
                                                           " " +"User Message" + " : " + item.text.toString()
                                                 
                                                }
                                                 
                                                </p>
                                              </ListItemDecorator>
                                            </ListItem>
                                          ))}
                                  </List>
                                </Sheet>
                        </Grid>
                        <Grid item xs={12} style={{ paddingBottom: 0 }}>
                            <Input
                                fullWidth
                                startDecorator={<Message />}
                                value={answerText}
                                onChange={(event: any) => setAnswerText(event.target.value)}
                                endDecorator={<Button variant='solid' onClick={() => answerText !== "" ? textAction() : null}>Send Message</Button>}
                              />
                        </Grid>
                      </Grid>
                </Item>
              </Grid>
              <Grid item xs={2}>
              </Grid>
            </Grid>
    </Box>
    </div>
  );
}

export default App;
