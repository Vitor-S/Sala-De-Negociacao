import styled from "styled-components";

const light = '#8289f5'
const middle = '#4a59e0'
const middle_purple = '#4B31DE'

const shadow = '-webkit-box-shadow: 0px 0px 19px 0px rgba(11,7,89,1); -moz-box-shadow: 0px 0px 19px 0px rgba(11,7,89,1); box-shadow: 0px 0px 19px 0px rgba(11,7,89,1);'

export const StyledRegister = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${middle};

    .container{
        width: 60%;
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
            width: 50%;
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
`

export const StyledLogin = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${middle};
    
    .form-wrapper{
        width: 65%;
        min-height: 502px;
        display: flex;
        ${shadow}
        
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
                padding: 0 20px;

                .inputs-container{
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                }

                input{
                    min-width: 300px;
                }
            }
        }
    }
`

export const StyledHome = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Dosis&display=swap');

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
        height: 100%;
        display: flex;
        background-color: ${light};

        .search-filters{
            display: flex;
            flex-direction: column;
            flex: 3;
            height: 100%;

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
            gap: 20px;
            flex-flow: wrap;
            flex: 7;
            height: calc(100% - 40px);
            padding: 20px;
            overflow-y: scroll;
        }

        
    }
`

export const StyledProfile = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Dosis&display=swap');
 
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${light};

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

            .info-container{
                position: relative;
                /* -webkit-box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.75);
                -moz-box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.75);
                box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.75); */
                ${shadow}
                background-color: #FFF;

                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 25px;

                width: 80%;
                height: 75%;
                border-radius: 10px;

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
                /* -webkit-box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.75);
                -moz-box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.75);
                box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.75); */
                ${shadow}
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

            h2{
                color: #FFF;
                font-family: 'Dosis';
                font-size: 1.6rem;
                text-align: center;
            }
        }
    }
`

export const StyledEditModal = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .modal-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 20px 40px;
        width: 25%;
        min-width: 350px;
        height: 70%;
        background-color: #fff;
        ${shadow}

        h3{
            font-family: 'Dosis';
        }
    }
`