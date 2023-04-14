import styled from "styled-components"

export const StyledCard = styled.div`
    width: 180px;
    height: 230px;
    background-color: #f6f3e7;
    display: flex;
    flex-direction: column;
    transition: 0.3s ease-out;

    &:hover{
        scale: 1.02;
        cursor: pointer;
    }

    .photo-container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 2;

        img{
            width: 60%;
            border-radius: 50%;
        }
    }

    .info-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
`

export const StyledSideBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    flex: 1;

    .sidebar-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px;

        .photo{
            flex: 1;
            width: 70%;
            border-radius: 50%;
        }

        .name{
            flex: 4;
            text-align: center;
        }
        
        .exit{
            flex: 1;
            text-align: center;
        }
    }
`

export const StyledSearchView = styled.div`
        flex: 3;
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        height: calc(100% - 136px);
        gap: 15px;
        overflow-y: scroll;
    
`