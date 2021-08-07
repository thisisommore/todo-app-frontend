import styled from "styled-components";

export default styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
  align-items: flex-start;

  .container-task {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 10px 10px 0 0 #a700aa;
    border: 3px solid #a700aa;
    border-radius: 13px;
    padding: 20px 10px;
    padding-bottom: 0;
    margin: 10px;
    max-width: 40%;
    transition: 0.3s;
    @media only screen and (max-width: 723px) {
      max-width: 100%;
      width: 100%;
    }
    .top-section {
      display: flex;
      justify-content: space-between;
      .content {
        font-family: "Cascadia Code", sans-serif;
        color: #a700aa;
        margin: 0;
        margin-right: 10px;
        font-size: var(--font-md);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* number of lines to show */
        -webkit-box-orient: vertical;
      }
      .btn-done {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;
        background: #a700aa;
        color: white;
        border: none;
        font-size: 20px;
        border-top-left-radius: 100%;
        border-bottom-left-radius: 100%;
        margin-right: -12px;
        margin-top: -13px;
      }
    }

    .created-on {
      font-size: var(--font-xs);
      color: #a700aa;
      font-family: "Cascadia Code", sans-serif;
    }
  }
`;
