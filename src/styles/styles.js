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
            height: 72%;

            .form-bg{
                display: none;
            }
        }
    }
`

export const StyledHome = styled.div`
    section{
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 100vw; 
        min-height: 100vh;
        background-color: #4A59E0;

        .section-central{
            display: flex;
            justify-content: center;
            width: 70%;
            height: 70%;
            gap: 8%;
            color: #fff;

            .section-info-container{
                display: flex;
                flex-direction: column;
                gap: 7%;
                width: 50%;

                .section-title{
                    font-size: 4em;
                }

                .section-title::after{
                    content: "Network";
                    color: #fc874c;
                }

                .section-subtext{
                    font-size: 1.3em;
                }

                p{
                    line-height: 30px;
                }

                button{
                    width: 40%;
                    min-height: 50px;
                    background-color: #fc874c;
                    color: #fff;
                    font-weight: bold;
                    font-size: 1.2;
                    margin: 15px 0;
                }
            }

            .section-image-container{
                width: min-content;

                img{
                    width: 360px;
                }
            }
        }
    }

    .tips-container{
        display: flex;
        max-width: 90%;
        gap: 40px;

        .tip-bg{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: lightgreen;
            opacity: 0.1;
            border-radius: 10px;
        }

        .tip{
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            /* width: 100%; */
            height: 100%;
            min-height: 400px;
            padding: 30px;
            color: #fff;
            gap: 30px;

            .tip-title{
                flex: 1;
                font-size: 3em;
            }

            .tip-text{
                flex: 2.5;
                font-size: 1.25em;
                text-align: start;
                line-height: 27px;
            }
        }
    }

    @media(max-width: 1200px){
        .section-central{
            width: 100%;
        }

        .section-image-container{
            display: none;
        }

        .section-info-container{
            min-width: 80%;

            .section-title, .section-subtext{
                text-align: center;
            }

            button{
                min-width: 100%;
            }
        }

        .tips-container{
            flex-direction: column;
        }
    }

    @media screen and (max-width: 465px){
        .section-central{
            width: 100% !important;
        }

        .section-image-container{
            display: none;
        }

        .section-info-container{
            min-width: 80%;

            .section-title{
                font-size: 4em !important; /* definição de font-size dentro da regra de mídia */
            }
            
            .section-subtext{
                font-size: 1.15em; /* definição de font-size dentro da regra de mídia */
            }

            button{
                min-width: 100%;
            }
        }

        .tip-title{
            font-size: 2em !important;
        }

        .tip-subtext{
            font-size: 1.1em !important;
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
                
                font-size: 2rem;
            }
            
            h3{
                text-align: center;
                
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
        grid-template-columns: 1fr 4fr;
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

        .data-form{
            flex: 1;
            display: flex;
        }

        .edit-1{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 20px;

            input{
                width: 100%;
            }
        }
        
        .edit-2{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 20px;

            input{
                width: 100%;
            }
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

export const StyledError = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #fe6969;
    overflow: hidden;

    h3{
        position: absolute;
        top: 0;
        text-align: center;
        padding: 20px;
    }

    img{
        width: 35vw;
        max-width: 560px;
    }

    @media(max-width: 800px){
        img{
            width: 70vw;
        }
    }
`
