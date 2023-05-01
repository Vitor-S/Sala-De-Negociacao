import styled from "styled-components";

const light = '#8289f5'
const middle = '#4a59e0'
const middle_purple = '#4B31DE'

const shadow = '-webkit-box-shadow: 0px 0px 19px 0px rgba(11,7,89,1); -moz-box-shadow: 0px 0px 19px 0px rgba(11,7,89,1); box-shadow: 0px 0px 19px 0px rgba(11,7,89,1);'

export const StyledRegister = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${middle};
    padding: 20px;

    .container{
        width: 70%;
        background-color: #fff;

        display: flex;
        flex-direction: column;

        padding: 50px;
        gap: 20px;

        .two-containers{
            display: flex;
            gap: 1%;
        }

        .left-container, .right-container{
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .span-2{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
            grid-column: span 2;
        }
    }

    @media (max-width: 500px) {
        .two-containers{
            flex-direction: column;
        }
    }
`

export const StyledLogin = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${middle};
    
    .form-wrapper{
        width: 80%;
        height: 60%;
        display: flex;
        ${shadow};

        
        .form-bg{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${middle_purple};
            flex: 2;

            img{
                width: 50%;
            }
        }

        .form-container{
            flex: 1;
            background-color: #fff;

            form{
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                
                .inputs-container{
                    width: 90%;
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }
            }
        }
    }

    @media (max-width: 1100px) {
        .form-wrapper{
            width: 95%;
            height: 80%;

            .form-bg{
                display: none;
            }
        }
    }
`

export const StyledHome = styled.div`

    *{
        margin: 0;
        padding: 0;
    }

    .home-body{
        height: 100vh;
    }

    .main-tip{
        display: flex;
        height: 90%;
        background-color: ${light};

        .tip-info{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90%;

            .tip-info-container{
                display: flex;
                flex-direction: column;
                gap: 20px;
                width: 90%;
                height: 45%;

                span, p, a{
                    font-family: 'Dosis', sans-serif;
                }

                span{
                    font-size: 5rem;

                    span{
                        color: blue;
                    }
                }

                p{
                    font-size: 1.5rem;
                }

                a{
                    font-size: 1.6rem;
                    color: blue;
                    text-decoration: none;
                }
            }
        }

        .tip-image{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;

            .tip-image-container{
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
                width: 70%;
                height: 70%;

                .section-image{
                    aspect-ratio: 16/9;
                    width: 100%;
                    border-radius: 10px;
                }
            }
        }
    }

    .second-tip{
        background-color: ${middle_purple};

        .tip-info-container{
            span{
                span{
                    color: #fff
                }
            }
        }

        .second-tip-span{
            color: #fff;
        }

        .second-tip-link{
            color: #fff;
        }
    }
    
`

export const StyledSearch = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #FFF;

    .search-body{
        width: 100vw;
        height: calc(100% - 65px);
        display: flex;
        background-color: ${light};

        .search-filters{
            display: flex;
            flex-direction: column;
            flex: 3;
            height: 100%;
            min-width: 230px;

            div{
                background-color: #FFF;
            }

            .search-area{
                flex: 1.5;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .filters-area{
                flex: 5;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 30px;

                .handle-filters{
                    width: 75%;
                    display: flex;
                    justify-content: space-between;

                    button{
                        font-family: 'Dosis';
                        font-size: 1rem;
                        padding: 0;
                    }
                }
            }
        }

        .search-results{
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 4%;
            flex-flow: wrap;
            padding: 20px;
            overflow-y: scroll;
            flex: 7;
        }
    }

    @media(max-width: 530px){
        .search-body{
            flex-direction: column;

            .search-filters{
                display: flex;
                flex-direction: row;
                flex: 1;
                
                .search-area{
                    padding: 10px 0;
                    input{
                        width: 100px;
                    }
                }

                .filters-area{
                    display: flex;
                    flex-direction: row;
                    overflow-x: scroll;
                    gap: 5px;

                    input{
                        width: 100px;
                    }

                    .handle-filters{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;

                        button{
                            width: 130px;
                            font-family: 'Dosis';
                            font-size: 1rem;
                            padding: 0;
                        }
                    }
                }
            }

            /* .search-filters{
                display: none;
            } */
        }
    }
`

export const StyledProfile = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Dosis&display=swap');
 
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .profile-body{
        width: 100vw;
        height: 100%;
        display: flex;

        .left-container{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: ${light};

            .info-container{
                position: relative;
                ${shadow}
                background-color: #FFF;

                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 25px;
                margin-left: 20%;

                width: 75%;
                height: 75%;
                border-radius: 10px;

                h3{
                    width: 90%;
                }

                .edit-profile{
                    position: absolute;
                    top: 5px;
                    right: 5px;
                }

                .locale{
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }
            }

            .profile-picture{
                display: flex;
                justify-content: center;
                align-items: center;
                ${shadow}
                aspect-ratio: 1/1;
                width: 25%;
                border-radius: 50%;
                padding: 5px;
                background-color: #FFF;
                transform: translateY(-50%);
            }

            h2{
                text-align: center;
                font-family: 'Dosis';
                font-size: 2rem;
            }
            
            h3{
                text-align: center;
                font-family: 'Dosis';
                font-size: 1.5rem;
            }
        }

        .right-container{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5%;
            font-size: 1rem;
            width: 100%;
            height: 100%;
            background-color: ${light};

            h2{
                color: #FFF;
                font-family: 'Dosis';
                font-size: 1.6rem;
                text-align: center;
            }
        }
    }

    @media(max-width: 900px){
        .profile-body{
            flex-direction: column;
            height: auto;

            .left-container{
                padding: 0;
                margin: 0;
                
                .info-container{
                    background-color: transparent;
                    padding: 80px 0;
                    width: 330px;
                    height: auto;
                    margin-left: 0;
                }
            }
            
            .right-container{
                height: 80vh;
                background-color: ${light};
                padding-bottom: 50px;

                h2{
                    font-size: 1.3rem;
                }
            }
        }

    }
`

export const StyledEditModal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .modal-container{
        display: grid;
        grid-template-columns: 1fr 2fr 2fr;
        grid-template-rows: 1fr 10fr 1fr;
        padding: 40px;
        width: 70%;
        min-width: 350px;
        height: 70%;
        background-color: #fff;
        ${shadow}

        h2{
            text-align: center;
            grid-column: span 3;
            font-family: 'Dosis';
            font-size: 2em;
        }

        .edit-picture{
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 40px;
            gap: 30px;
            
            label{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                
                img{
                    aspect-ratio: 1/1;
                    width: 80%;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: 0.3s ease-out;
                    border: 1px solid #000;

                    &:hover{
                        scale: 1.05;
                    }
                }
            }

            input{
                display: none;
            }
            
            
        }

        .edit-1{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 20px;
        }
        
        .edit-2{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 20px;
        }

        .edit-options{
            display: flex;
            justify-content: center;
            gap: 50px;
            grid-column: span 3;
        }
    }
`

export const StyledChat = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;

    

    .container{
        position: absolute;
        top: 65px;
        width: 100%;
        height: calc(100% - 65px);
        display: flex;
    }

    .left{
        flex: 1;
        background-color: ${light};
        overflow-y: scroll;
    }

    .right{
        flex: 2.5;

        .messages{
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 10px 30px;
            width: calc(100% - 60px);
            height: calc(80% - 101px);
            overflow-y: scroll;
        }
        
        .options{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            width: 100%;
            height: 20%;

            .view-contacts-button{
                display: none;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%, -50%);
            }

            .input-message{
                width: 80%;
            }
        }
    }

    .empty-right{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        align-items: center;
    }

    a{
        font-family: 'Dosis';
        font-size: 1.3em;
        text-decoration: none;
        color: ${middle};

        &:hover{
            font-weight: 500;
        }
    }

    @media(max-width: 755px){
        .right{
            .options{
                .input-message{
                    width: 70%;
                }
            }
        }
    }

    @media(max-width: 550px){
        .left{
            display: none;
        }

        .right{
            .options{
                position: absolute;
                height: auto;
                bottom: 10px;

                .view-contacts-button{
                    display: block;
                    transform: translate(-50%, -100%);
                }
            }
        }
    }    
`