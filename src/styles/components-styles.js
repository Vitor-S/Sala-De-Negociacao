import styled from "styled-components"
import { motion } from 'framer-motion'

const light = '#8289f5'
const middle = '#4a59e0'
const middle_purple = '#4B31DE'

const shadow = '-webkit-box-shadow: 0px 0px 4px 0px rgba(11,7,89,1); -moz-box-shadow: 0px 0px 19px 0px rgba(11,7,89,1); box-shadow: 0px 0px 4px 0px rgba(11,7,89,1);'

export const StyledCard = styled.div`
    width: 30%;
    min-width: 222px;
    height: 150px;

    .card-motion-container{
        display: flex;
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
                font-size: 1.5rem;
                text-align: center;
            }
    
            span{
                font-size: 1.2rem;
            }
        }
    }

    @media(max-width: 755px){
        width: 80%;
    }

`

export const StyledCalendar = styled.div`

    -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    height: 430px;
    width: 350px;
    font-family: 'Dosis', sans-serif;
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
            font-family: 'Dosis', sans-serif;
        }

        span{
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 55%;
            font-family: 'Dosis', sans-serif;
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
            font-family: 'Dosis', sans-serif;     
        }
    }
    
    .calendar-days{
        height: calc(100% - 119px);
        display: grid;
        grid-template-columns: repeat(7, 1fr);

        .view-mettings-button-container{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 320px;
            background-color: #1E88E5;

            .view-mettings-button{
                gap: 15px;
                color: #FFF;
            }
        }
        
        div{
            text-align: center;
            padding: 12px 15px;
            font-size: 1.1rem;
            font-family: 'Dosis', sans-serif;
        }
    }
`

export const StyledCalendarBack = styled.div`

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
        }

        .message{
            margin: 15px;
        }
    }
`

export const StyledHeader = styled.div`
    position: relative;
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
        cursor: pointer;

        span{
            font-size: 1.7rem;
            color: #fff;
            font-family: 'Dancing Script', cursive;
        }
    }

    .header-links{
        flex: 4;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10%;
        list-style: none;
    }

    a{
        color: #fff;
        text-decoration: none;
        font-size: 1.3rem;
        font-family: 'Dosis', sans-serif;

        &:hover{
            cursor: pointer;
            scale: 1.1;
        }
    }

    .dropdown-button{
        color: #fff;
        display: none;
    }

    .dropdown-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100vw;
        background-color: #4A59E0;
        z-index: 5;
        padding: 20px 0;

        ul{
            list-style: none;

            li{
                text-align: center;
                padding: 10px 0;
            }
        }

        button{
            margin: 10px 0;
        }
    }

    @media (max-width: 750px) {
        .header-links{
            display: none;
        }

        .dropdown-button{
            display: flex;
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
    background-color: #1E88E5;
`

export const StyledMeetingCard = styled.div`
    width: calc(100% - 40px);
    max-width: 350px;
    padding: 15px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-bottom :1px solid #fff;
    transition: 0.3s ease-out;
    word-break: break-all;
    color: #fff;

    &:hover{
        cursor: pointer;
    }
`

export const StyledMessage = styled.div`
    display: flex;
    width: 100%;
    justify-content: ${props => props.owner ? 'flex-end' : 'flex-start'};

    div{
        display: inline-block;
        max-width: 50%;
        flex-flow: wrap;
        padding: 10px;
        width: auto;
        background-color: ${props => props.owner ? middle : 'gray'};
        color: #fff;
        border-radius: 10px;
        word-break: break-all;
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
        }
        
        .message-date{
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.15em;
            font-style: italic;
        }
        
    }

    @media(max-width: 755px){
        height: auto;
    }
`

export const StyledChatHeader = styled(motion.div)`
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0 3%;
    gap: 3%;
    border-bottom: 1px solid #000;

    img{
        height: 70%;
        border-radius: 50%;
    }

    h3{
        font-size: 1.4em;
    }

    @media(max-width: 755px){
        height: 50px;
    }
`

export const PopupStyle = styled(motion.div)`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 40%;
    background-color: #FFF;
    border-radius: 10px;
    z-index: 100;
    min-height: 300px;

    -webkit-box-shadow: 0px 0px 50px 0px rgba(11,7,89,1); 
    -moz-box-shadow: 0px 0px 50px 0px rgba(11,7,89,1); 
    box-shadow: 0px 0px 50px 0px rgba(11,7,89,1);

    .children-container{
        width: 70%;
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    
     @media(max-width: 1150px){
        width: 50%;
    }

    @media(max-width: 700px){
        width: 80%;
        height: 50%;
    }
`

export const StyledLoading = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${middle};
    color: #FFF;
    z-index: 200;

    .animation-container{
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 8%;
    }

    span{
        width: 15px;
        height: 15px;
        background-color: #FFF;
        border-radius: 50%;
    }
`