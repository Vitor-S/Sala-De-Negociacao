import styled from "styled-components"

const shadow = '-webkit-box-shadow: 0px 0px 10px 0px rgba(11,7,89,1); -moz-box-shadow: 0px 0px 19px 0px rgba(11,7,89,1); box-shadow: 0px 0px 10px 0px rgba(11,7,89,1);'

export const StyledCard = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Dosis');

    display: flex;
    width: 27%;
    height: 150px;
    margin: 6px;
    padding: 5px 10px;
    background-color: #fff;
    ${shadow};
    border-radius: 10px;
    transition: 0.3s ease-out;

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
`

export const StyledCalendar = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Dosis');

    -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    height: 430px;
    width: 350px;

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
            }

            &:hover svg{
                color: #1E88E5;
            }
        }
    }

    .calendarback-events{
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
    display: flex;
    justify-content: space-between;
    width: 80%;
    
    .left-links{
        display: flex;
        gap: 20px;
    }

    .logout-link:hover{
        cursor: pointer;
    }

    a{
        color: #fff;
        text-decoration: none;
        font-family: 'Dosis';
        font-size: 1.3rem;
    }
`