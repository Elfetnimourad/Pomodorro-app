import React, { useState, useEffect } from 'react';
import './Pomodoro.css';
import SettingsIcon from '@mui/icons-material/Settings';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import CircularProgress from '@mui/joy/CircularProgress';

export const Pomodoro = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [work, setWork] = useState<number>(25);
  const [shortBreak, setShortBreak] = useState<number>(1);
  const [langBreak, setLangBreak] = useState<number>(30);
  const [color, setColor] = useState<boolean>(false);
  const [colorBreak, setColorBreak] = useState<boolean>(false);
  const [colorBreakLang, setColorBreakLang] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100);
  useEffect(() => {
    if(start){
    
      if(colorBreak){
        const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - (100/(shortBreak*60)) : 0));
      }, 1000)
      return () => {
        clearInterval(timer);
      };
      }else if(colorBreakLang){
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - (100/(langBreak*60)) : 0));
        }, 1000)
        return () => {
          clearInterval(timer);
        };
      }else if(color){
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - (100/(work*60)) : 0));
        }, 1000)
        return () => {
          clearInterval(timer);
        };

      }else{
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - (100/(minutes*60)) : 0));
        }, 1000)
        return () => {
          clearInterval(timer);
        };

      }
   
  }
  }, [color, colorBreak, colorBreakLang, langBreak, minutes, shortBreak, start, work]);

  const handelFunc = () => {
    setExpanded(!expanded);
  };

  const clickshortBreak = () => {
    setMinutes(shortBreak);
    setSeconds(0);
    setColorBreak(!colorBreak);
    setColor(false);
    setColorBreakLang(false);
    setStart(!start)
     setProgress(100)
    
  };

  const clickWork = () => {
    setMinutes(work);
    setSeconds(0);
    setColor(!color);
    setColorBreak(false);
    setColorBreakLang(false);
    setStart(!start)
       setProgress(100)    
  };

  const clicklangBreak = () => {
    setMinutes(langBreak);
    setSeconds(0);
    setColorBreakLang(!colorBreakLang);
    setColor(false);
    setColorBreak(false);
    
       setProgress(100)    
       setStart(!start)
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (start) {
        if (minutes >= 0 && seconds >= 0) {
          if (seconds === 0 && minutes > 0 ) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else if (seconds === 0 && minutes === 0) {
           
            clearInterval(intervalId);
          } else {
            setSeconds((prevSeconds) => (prevSeconds - 1));
          }
        } else {
          clearInterval(intervalId);
        }
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [minutes, seconds, start]);;

  return (
    <div className={expanded ? 'div vh-100 d-flex justify-content-center align-items-center ' : 'now vh-100 d-flex justify-content-center align-items-center cc'}>
      <div className="column">
        <div className="btn-group rounded-4">
          <button className={color ? 'btn rounded-5 btnColor' : 'btn rounded-5'} onClick={clickWork}>work</button>
          <button className={colorBreak ? 'btn rounded-5 btnColor' : 'btn rounded-5'} onClick={clickshortBreak}>short break</button>
          <button className={colorBreakLang ? 'btn rounded-5 btnColor' : 'btn rounded-5'} onClick={clicklangBreak}>long break</button>
        </div>
        <div className="circle-clock d-flex justify-content-center align-items-center ms-5 mt-5">
          <div className="row">
            <div className="circle-time d-flex justify-content-center align-items-center">
              <div className="row ms-2 mt-2 ">
                <h1 className='text-white d-inline here'>{(minutes < 10 && minutes>=0) ? `0${minutes}`: minutes}:{(seconds < 10 && seconds>=0) ? `0${seconds}`: seconds}</h1>
                <button className="text-white ms-3 btnStart" onClick={()=>setStart(!start)}><h5>{start ? 'Pause' : 'Start'}</h5></button>
                  <CircularProgress color="danger" className='reversedCircularProgessbar' sx={{ '--CircularProgress-size': '180px' }} determinate value={progress}/>    
              </div>
            </div>
          </div>
        </div>
        <SettingsIcon className='text-white setting' onClick={handelFunc} />
        <Collapse in={expanded}>
          <Card className='mt-5 z-999 cardSettings'>
            <CardContent>
              <div className="d-flex flex-row">
                <h1>Setting</h1>
                <div className='ms-auto'>
                  <CloseIcon onClick={() => setExpanded(false)} />
                </div>
              </div>
              <hr />
              <div className="column rr">
                <label htmlFor="" className='label fw-bold'>Work:</label>
                <input type="text" value={work} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setWork(Number(event.target.value))} className='rounded-2  inputStyle' placeholder='ggg' />
                <label htmlFor="" className='label fw-bold'>Short Break:</label>
                <input type="text" value={shortBreak} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setShortBreak(Number(event.target.value))} className='rounded-2 inputStyle' placeholder='ggg' />
                <label htmlFor="" className='label fw-bold'>Long Break:</label>
                <input type="text" value={langBreak} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLangBreak(Number(event.target.value))} className='rounded-2 inputStyle' placeholder='ggg' />
              </div>
              <CardActions>
                <Button type='submit' variant="contained" className="ms-auto mt-auto save">Save</Button>
              </CardActions>
            </CardContent>
          </Card>
        </Collapse>
      </div>
    </div>
  );
};
