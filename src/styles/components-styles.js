import styled from "styled-components"
import { motion } from 'framer-motion'

const light = '#8289f5'
const middle = '#4a59e0'
const middle_purple = '#4B31DE'

const shadow = '-webkit-box-shadow: 0px 0px 4px 0px rgba(11,7,89,1); -moz-box-shadow: 0px 0px 19px 0px rgba(11,7,89,1); box-shadow: 0px 0px 4px 0px rgba(11,7,89,1);'

export const StyledCard = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Dosis');

    width: 27%;
    height: 150px;

    .card-motion-container{
        display: flex;
        margin: 6px;
        padding: 5px 10px;
        background-color: ${middle};
        ${shadow};
        border-radius: 2px;
        transition: 0.3s ease-out;
        color: #fff;
        width: 100%;
        height: 100%;
        
        &:hover{
            cursor: pointer;
            scale: 1.02;
        }
    
        .photo-container{
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 3;
            height: 100%;
    
            img{
                width: 70%;
                border-radius: 50%;
            }
        }
    
        .info-container{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex: 7;
            height: 100%;
    
            h3, span{
                font-family: 'Dosis';
                font-size: 1.5rem;
                text-align: center;
            }
    
            span{
                font-size: 1.2rem;
            }
        }
    }

`

export const StyledCalendar = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Dosis');

    -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    height: 430px;
    width: 350px;

    background-color: #fff;

    .calendar-header{
        height: 80px;
        display: flex;
        justify-content: space-around;
        background-color: #1E88E5;
        color: #FFF;

        .arrow, .back_today{
            width: 100%;
            border: none;
            background-color: transparent;
            transition: 0.3s ease-out;
            color: #fff;
            height: 100%;

            &:hover{
                color: #1E88E5;
                cursor: pointer;
                background-color: #fff;
            }

            &:hover svg{
                color: #1E88E5;
            }
        }

        .back_today{
            font-size: .95rem;
            font-family: 'Dosis';
        }

        span{
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 55%;
            font-family: 'Dosis';
        }
    }

    .calendar-weekdays{
        display: grid;
        /* grid-template-rows: 1fr; */
        grid-template-columns: repeat(7, 1fr);
        background-color: #2196F3;
        color: #FFF;
        padding: 4px;
        
        div{
            text-align: center;
            padding: 5px 8px;
            font-size: 1.1rem;
            font-family: 'Dosis';            
        }
    }
    
    .calendar-days{
        display: grid;
        /* grid-template-rows: 5fr; */
        grid-template-columns: repeat(7, 1fr);
        
        div{
            text-align: center;
            padding: 12px 15px;
            font-size: 1.1rem;
            font-family: 'Dosis';
        }
    }
`

export const StyledCalendarBack = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Dosis');

    -webkit-box-shadow: 0px 0px 48px 2px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 48px 2px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 48px 2px rgba(0,0,0,0.75);
    background-color: #FFF;
    height: 430px;
    width: 350px;
    padding-bottom: 10px;


    .calendarback-header{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        background-color: #1E88E5;
        color: #FFF;
        font-family: 'Dosis';
        font-size: 1.3rem;
    }

    .calendarback-options{
        display: flex;
        background-color: #2196F3;
        color: #FFF;
        height: 40px;
        
        button{
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: none;
            transition: .3s ease-out;
            color: #FFF;

            &:hover{
                cursor: pointer;
                background-color: #FFF;
                color: #1E88E5;
            }

            &:hover svg{
                color: #1E88E5;
            }
        }
    }

    .calendarback-events{
        height: 320px;

        .contact-people{
            width: 100%;
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
        }

        .date-info{
            display: flex;
            justify-content: center;

            div{
                display: flex;
                gap: 10px;
                padding-bottom: 10px;
            }

            font-family: 'Dosis';
        }

        .message{
            margin: 15px;
        }
    }
`

export const StyledHeader = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Dancing+Script&display=swap');

    display: flex;
    min-height: 65px;
    height: 65px;
    background-color: ${middle};
    padding: 0 3%;

    .header-logo{
        flex: 3;
        display: flex;
        align-items: center;
        gap: 5%;

        span{
            font-family: 'Dancing Script', cursive;
            font-size: 1.4rem;
            color: #fff;
        }
    }

    .header-links{
        flex: 4;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10%;
    }

    a{
        color: #fff;
        text-decoration: none;
        font-family: 'Dosis';
        font-size: 1.3rem;

        &:hover{
            cursor: pointer;
            scale: 1.1;
        }
    }
`

export const StyledViewMeetings = styled.div`
    max-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 100%;
    overflow-y: scroll;
`

export const StyledMeetingCard = styled.div`
    width: calc(100% - 40px);
    padding: 15px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-bottom :1px solid #000;
    transition: 0.3s ease-out;

    &:hover{
        cursor: pointer;
    }
`

export const StyledMessage = styled.div`
    display: flex;
    width: 100%;
    justify-content: ${props => props.owner ? 'flex-end' : 'flex-start'};

    div{
        max-width: 80%;
        display: inline-block;
        flex-flow: flex-end;
        padding: 10px;
        width: auto;
        background-color: ${props => props.owner ? middle : 'gray'};
        color: #fff;
        border-radius: 10px;
    }
`

export const StyledContactCard = styled(motion.div)`
    display: flex;
    height: 10%;
    padding: 10px;
    border-bottom: 1px solid #000;

    .contact-picture-container{
        display: flex;
        justify-content:center;
        align-items: center;
        flex: 1;

        img{
            aspect-ratio: 1/1;
            border-radius: 50%;
            width: 50%;
        }
    }

    .contact-info{
        position: relative;
        gap: 10%;
        flex: 2.5;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h3{
            font-size: 1.4em;
            font-family: 'Dosis';
        }
        
        .message-date{
            font-family: 'Dosis';
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.15em;
            font-style: italic;
        }
        
    }
`