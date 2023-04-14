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

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(5, 1fr);

        padding: 50px;
        gap: 25px;

        .span-2{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
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
    width: 100vw;
    height: 100vh;
    background-color: ${middle};
    display: flex;
    justify-content: center;
    align-items: center;

    .home-container{
        width: 80%;
        height: 80%;
        background-color: #FFF;
        ${shadow};

        display: flex;
        justify-content: center;
        align-items: center;
    }
`