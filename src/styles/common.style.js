/** @format */

import styled, { css } from "styled-components";
// import { mediaQueries } from '../../utils/mediaQuery';

export const CommonBlockMain = styled.div`
  position: relative;
  background-image: url(../../bg-background.png);
  background-size: cover;
  height: 100vh;
  &.height-auto {
    height: auto;
  }
`;
export const HeaderMain = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 9;
  &.middle-block {
    .header-main {
      justify-content: space-between;
    }
  }
  .header-main {
    position: relative;
    padding: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    @media (max-width: 1400px) {
      padding: 20px;
    }
    @media (max-width: 767px) {
      padding: 15px;
      justify-content: flex-end;
    }
    .header-left-block {
      position: absolute;
      left: 20px;
      @media (max-width: 1199px) {
        left: 0px;
      }
      ul {
        display: flex;
        align-items: center;
        margin: 0px;
        padding: 0px;
        li {
          padding: 0px 15px;
          list-style: none;
          @media (max-width: 1199px) {
            padding: 0px 10px;
          }
          @media (max-width: 767px) {
            padding: 0px 4px;
          }
          a {
            svg {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
    .header-middle-block {
      a {
        img {
          width: 550px;
        }
      }
      @media (max-width: 1199px) {
        a {
          img {
            width: 400px;
          }
        }
      }
      @media (max-width: 767px) {
        a {
          img {
            width: 200px;
          }
        }
      }
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    @media (max-width: 767px) {
      flex-wrap: wrap;
    }
    .common-btn {
      color: #5de6fa;
      font-size: 24px;
      line-height: 24px;
      padding: 12px 35px;
      background-color: transparent;
      border: 2px solid #5de6fa;
      cursor: pointer;
      border-radius: 30px;
      font-family: 'Goldman', sans-serif;
      cursor: pointer;
      @media (max-width: 1400px) {
        font-size: 20px;
        line-height: 20px;
        padding: 12px 25px;
      }
      @media (max-width: 767px) {
        font-size: 13px;
        line-height: 13px;
        padding: 10px 14px;
        margin-right: 5px !important;
      }
      &:hover {
        background-color: #5de6fa;
        border-color: #5de6fa;
        color: #000;
        &.tw-connected-wallet {
          .tw-connected-wallet__address,
          .tw-connected-wallet__balance {
            color: #000 !important;
          }
        }
      }
      .tw-connected-wallet__address,
      .tw-connected-wallet__balance {
        color: #5de6fa !important;
      }
      &.tw-connect-wallet,
      &.tw-connected-wallet,
      &.tw-connect-wallet--switch-network {
        position: absolute;
        right: 35px;
        @media (max-width: 991px) {
          left: auto;
          right: auto;
          margin: 0 auto;
          top: 53px;
        }
        @media (max-width: 767px) {
          top: 53px;
        }
      }
    }
  }
`;


export const CommonPageFull = styled.div`
  position: relative;
  padding: 165px 35px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1400px) {
    padding: 135px 25px 30px;
  }
  @media (max-width: 1366px) {
    padding: 135px 15px 30px;
  }
  @media (max-width: 767px) {
    padding: 125px 15px 30px;
  }
  .form-error {
    color: red;
    padding: 5px;
  }
  .common-block-center {
    position: relative;
    margin-top: 70px;
    .logo-main {
      img {
        width: 500px;
        margin: 0 auto;
        display: table;
      }
    }
    @media (max-width: 1400px) {
      margin-top: 25px;
    }
    @media (max-width: 767px) {
      .logo-main {
        img {
          width: 100%;
          margin: 0 auto;
          display: table;
        }
      }
    }
    .play-now-btn {
      margin: 50px auto 0px;
      display: table;
      @media (max-width: 767px) {
        margin: 30px auto 0px;
      }
      .play-btn {
        background-color: transparent;
        color: #4ee1f9;
        font-size: 50px;
        line-height: 50px;
        font-family: 'Goldman', sans-serif;
        border-radius: 16px;
        /* border: none; */
        border: 1px solid #4ee1f9;
        padding: 20px 75px;
        cursor: pointer;
        @media (max-width: 1400px) {
          padding: 18px 40px;
          font-size: 34px;
          line-height: 34px;
        }
        @media (max-width: 767px) {
          padding: 16px 25px;
          font-size: 26px;
          line-height: 26px;
        }
        &:hover {
          background-color: #5de6fa;
          border-color: #5de6fa;
          color: #000;
          &.tw-connected-wallet {
            .tw-connected-wallet__address,
            .tw-connected-wallet__balance {
              color: #000 !important;
            }
          }
        }
      }
    }
  }
  .game-three-block {
    position: relative;
    /* padding: 50px 0px 40px; */
    padding: 25px 0px 0px;
    display: flex;
    margin: 0px -15px;
    width: 100%;
    @media (max-width: 1600px) {
      padding: 35px 0px;
      margin: 0px -15px;
    }
    @media (max-width: 1199px) {
      margin: 0px -7px;
    }
    @media (max-width: 991px) {
      margin: 0px;
      // display: block;
      flex-direction: column;
      padding: 50px 0px 0px;
    }
    .game-three-block-left {
      width: 25%;
      padding: 0px 15px;
      @media (max-width: 1600px) {
        padding: 0px 15px;
      }
      @media (max-width: 1400px) {
        width: 30%;
      }
      @media (max-width: 1199px) {
        width: 33.3%;
        padding: 0px 7px;
      }
      @media (max-width: 991px) {
        width: 100%;
        padding: 0px 0px 15px;
        order: 2;
      }
      .game-three-block-left-inner {
        margin-bottom: 15px;
        .time-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          h4 {
            font-size: 24px;
            line-height: 28px;
            color: #fff;
            margin: 0px;
            font-weight: 400;
            overflow: hidden;
            text-decoration: none;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 50%;
            @media (max-width: 1600px) {
              font-size: 20px;
              line-height: 26px;
            }
          }
          p {
            font-size: 26px;
            line-height: 26px;
            /* color: #dadcdc; */
            color: #13e87d;
            font-weight: 400;
            border: 2px solid #dadcdc;
            padding: 10px 0px;
            border-radius: 30px;
            margin: 0px;
            width: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #13e87d;
            @media (max-width: 1600px) {
              font-size: 20px;
              line-height: 20px;
              width: 100px;
            }
          }
          @keyframes blink {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          .timer__change__color {
            color: red;
            animation: blink 1s infinite;
            border: 1px solid red;
          }
          .timer__zero_second__color {
            color: red;
            border: 1px solid red;
          }
        }
        .puls-player-price {
          display: flex;
          margin-top: 15px;
          .puls-player-price-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.8);
            @media (max-width: 1600px) {
              width: 40px;
              height: 40px;
            }
            img {
              width: 100%;
            }
          }
          .puls-player-price-icon-text {
            padding-left: 20px;
            width: 36%;
            h5 {
              font-size: 22px;
              line-height: 26px;
              color: #fff;
              font-weight: 400;
              margin: 0px 0px 4px;
              @media (max-width: 1600px) {
                font-size: 18px;
                line-height: 24px;
              }
            }
            p {
              font-size: 14px;
              line-height: 18px;
              color: rgba(255, 255, 255, 0.7);
              font-weight: 400;
              margin: 0px 0px 4px;
              @media (max-width: 1600px) {
                font-size: 12px;
                line-height: 17px;
              }
            }
          }
        }
      }
      .player-list-left {
        h2 {
          font-size: 24px;
          line-height: 30px;
          color: #fff;
          /* margin: 0px 0px 10px; */
          margin: 0px;
          font-weight: 400;
          @media (max-width: 1600px) {
            font-size: 20px;
            line-height: 26px;
          }
        }
        &.player-list-left-scroll {
          .player-list-left-inner {
            .player-list-left-inner-scroll {
              max-height: 280px;
              overflow: hidden;
            }
          }
          &.show-content {
            .player-list-left-inner {
              .player-list-left-inner-scroll {
                overflow-y: scroll;
              }
            }
          }
        }
        .player-list-left-inner {
          .player-list-left-inner-block {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            margin-top: 18px;
            cursor: pointer;
            @media (max-width: 1600px) {
              padding: 10px;
            }
            &.orange-bg {
              border-right: 8px solid #ffa629;
              &.active {
                border: 2px solid #ffa629;
              }
            }
            &.yellow-bg {
              border-right: 8px solid #fef536;
              &.active {
                border: 2px solid #fef536;
              }
            }
            &.red-bg {
              border-right: 8px solid #ff3131;
              &.active {
                border: 2px solid #ff3131;
              }
            }
            &.green-bg {
              border-right: 8px solid #00ef67;
              &.active {
                border: 2px solid #00ef67;
              }
            }
            &.pink-bg {
              border-right: 8px solid #ff66c4;
              &.active {
                border: 2px solid #ff66c4;
              }
            }
            h3 {
              font-size: 20px;
              line-height: 24px;
              color: #fff;
              font-weight: 400;
              @media (max-width: 1600px) {
                font-size: 19px;
                line-height: 22px;
              }
              @media (max-width: 1300px) {
                font-size: 16px;
                line-height: 20px;
              }
            }
            .player-list-left-icon {
              display: flex;
              align-items: center;
              .player-list-left-icon-flex {
                width: 30px;
                height: 30px;
                border-radius: 30px;
                background-color: #d7dbfb;
                display: flex;
                align-items: center;
                justify-content: center;
                @media (max-width: 1600px) {
                  width: 30px;
                  height: 30px;
                }
                img {
                  width: 100%;
                  @media (max-width: 1600px) {
                    width: 100%;
                  }
                }
              }
              p {
                font-size: 18px;
                line-height: 24px;
                color: #fff;
                font-weight: 400;
                padding-left: 10px;
                @media (max-width: 1600px) {
                  font-size: 14px;
                  line-height: 20px;
                }
                span {
                  color: rgba(255, 255, 255, 0.7);
                  display: block;
                }
              }
            }
          }
          .down-arrow-block {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 15px 0px 0px;
            button {
              padding: 0px;
              background: none;
              border: none;
              padding: 0px;
              cursor: pointer;
            }
          }
        }
        .usercount_live {
          display: flex;
          justify-content: space-between;
          /* @media (max-width: 991px) {
            justify-content: space-between;
          } */
          h2:nth-child(2) {
            color: #ccfd07;
          }
        }
      }
    }
    .game-three-block-middle {
      width: 50%;
      padding: 0px 15px;
      @media (max-width: 1600px) {
        padding: 0px 15px;
      }
      @media (max-width: 1400px) {
        width: 40%;
      }
      @media (max-width: 1199px) {
        width: 33.3%;
        padding: 0px 7px;
      }
      @media (max-width: 991px) {
        width: 100%;
        padding: 0px 0px 15px;
        order: 1;
      }
      .block-game-bg {
        padding: 15px;
        border-radius: 20px;
        background-color: #000;
        border: 8px solid #212026;
        position: relative;
        .game_end_message {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(34, 33, 33, 0.6);
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          @media (max-width: 991px) {
            font-size: 22px;
          }
        }
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .fleshing_spin_the_botle {
          animation: blink 1s infinite;
        }

        canvas {
          /* width: 100%; */
          height: 480px;
        }
        @media (max-width: 1600px) {
          padding: 10px;
        }
        @media (max-width: 1400px) {
          canvas {
            width: 100%;
            height: auto;
          }
        }
        @media (max-width: 1199px) {
          canvas {
            width: 100%;
            height: auto;
          }
        }
        .block-winner-details {
          position: absolute;
          top: 50%;
          left: 50%;
          right: 0px;
          width: 170px;
          background-color: #222121;
          border-radius: 20px;
          padding: 0px 15px 15px;
          text-align: center;
          margin: 0 auto;
          transform: translate(-50%, -50%);
          @media (max-width: 1400px) {
            width: 200px;
          }
          @media (max-width: 1199px) {
            width: 150px;
            padding: 0px 15px 15px;
          }
          &.diff-position-block {
            /* top: 140px; */
            width: 170px;
            @media (max-width: 1400px) {
              width: 170px;
            }
            @media (max-width: 1199px) {
              width: 150px;
              padding: 0px 15px 15px;
            }
            .img-winner {
              margin-bottom: 70px;
              @media (max-width: 1199px) {
                margin-bottom: 70px;
              }
              > img {
                width: 50px;
                height: 50px;
                @media (max-width: 1199px) {
                  width: 50px;
                  height: 50px;
                }
              }
              .profile-frame-img {
                img {
                  width: 100px;
                  @media (max-width: 1199px) {
                    width: 100px;
                  }
                }
              }
            }
            h3 {
              font-size: 18px;
              @media (max-width: 1199px) {
                font-size: 16px;
              }
            }
            h4 {
              font-size: 14px;
              color: white;
              font-weight: 400;
              @media (max-width: 1199px) {
                font-size: 14px;
              }
            }
            .bonus-first-text {
              color: #5ddfe6;
            }
            .bonus-second-text {
              color: #46f511;
            }
            .bonus-third-text {
              color: #ee8e10;
            }

            p {
              font-size: 14px;
              @media (max-width: 1199px) {
                font-size: 14px;
              }
            }
            .block-winner-details-text {
              .puls-player-price-icon {
                width: 30px;
                height: 30px;
                img {
                  width: 100%;
                }
                @media (max-width: 1199px) {
                  width: 25px;
                  height: 25px;
                  img {
                    width: 12px;
                  }
                }
              }
              h2 {
                font-size: 16px;
                line-height: 22px;
                padding-left: 10px;
                @media (max-width: 1199px) {
                  font-size: 14px;
                  line-height: 18px;
                  padding-left: 5px;
                }
              }
            }
          }
          .img-winner {
            position: relative;
            margin-bottom: 70px;
            > img {
              /* width: 100px;
              height: 100px; */
              object-fit: cover;
              border-radius: 50%;
              position: relative;
              top: 42px;
              width: 50px;
              height: 50px;
              @media (max-width: 1199px) {
                width: 50px;
                height: 50px;
              }
            }
            .profile-frame-img {
              position: absolute;
              top: 28px;
              left: 0px;
              right: 0px;
              @media (max-width: 1199px) {
                top: 34px;
              }
              img {
                width: 100px;
              }
            }
          }
          h3 {
            /* font-size: 24px; */
            line-height: 22px;
            color: #fff;
            font-weight: 400;
            margin: 0px 0px 5px;
            text-transform: uppercase;
            font-size: 18px;
            @media (max-width: 1199px) {
              font-size: 16px;
            }
          }
          p {
            font-size: 14px;
            line-height: 20px;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 400;
            margin-bottom: 5px;
            @media (max-width: 1199px) {
              font-size: 14px;
              line-height: 20px;
            }
          }
          .block-winner-details-text {
            display: flex;
            align-items: center;
            justify-content: center;
            .puls-player-price-icon {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(255, 255, 255, 0.8);
              img {
                width: 100%;
              }
            }
            h2 {
              font-size: 16px;
              line-height: 22px;
              padding-left: 10px;
              color: #fff;
              font-weight: 400;
              margin: 0px;
              @media (max-width: 1199px) {
                font-size: 14px;
                line-height: 18px;
                padding-left: 5px;
              }
            }
          }
        }
      }
      .text-block-spin {
        padding: 10px;
        text-align: center;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        h2 {
          font-size: 40px;
          line-height: 40px;
          color: #fff;
          margin: 0px 0px 5px;
          font-weight: 400;
          span {
            padding-left: 15px;
          }
          @media (max-width: 1600px) {
            font-size: 36px;
            line-height: 36px;
          }
          @media (max-width: 1199px) {
            font-size: 30px;
            line-height: 34px;
          }
          @media (max-width: 991px) {
            font-size: 26px;
            line-height: 30px;
          }
        }
        p {
          font-size: 20px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 400;
          margin: 0px;
          @media (max-width: 1600px) {
            font-size: 20px;
            line-height: 24px;
          }
          span {
            padding-left: 15px;
          }
        }
      }
    }
    .game-three-block-right {
      width: 25%;
      padding: 0px 15px;
      @media (max-width: 1600px) {
        padding: 0px 15px;
      }
      @media (max-width: 1400px) {
        width: 30%;
      }
      @media (max-width: 1199px) {
        width: 33.3%;
        padding: 0px 7px;
      }
      @media (max-width: 991px) {
        width: 100%;
        padding: 0px;
        order: 3;
      }
      .game-three-block-right-inner {
        padding: 20px;
        @media (max-width: 1600px) {
          padding: 10px;
        }
        .bonus-block-inner {
          text-align: center;
          border: 6px solid transparent;
          margin-bottom: 10px;
          @media (max-width: 1600px) {
            border: 4px solid transparent;
            margin-bottom: 10px;
          }
          h2 {
            text-align: center;
            text-transform: uppercase;
            font-size: 24px;
            line-height: 24px;
            /* color: #fff; */
            font-weight: 400;
            margin-bottom: 15px;
            @media (max-width: 1600px) {
              font-size: 20px;
              line-height: 24px;
            }
          }
          .bonus-block-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            .bonus-block-icon-inner {
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: rgba(255, 255, 255, 0.8);
              width: 40px;
              height: 40px;
              border-radius: 50%;
              @media (max-width: 1600px) {
                width: 30px;
                height: 30px;
              }
              img {
                width: 100%;
              }
            }
            h2 {
              font-size: 36px;
              line-height: 36px;
              color: #fff;
              font-weight: 400;
              padding-left: 10px;
              margin: 0px;
              @media (max-width: 1600px) {
                font-size: 30px;
                line-height: 30px;
              }
            }
          }
          p {
            font-size: 18px;
            line-height: 24px;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 400;
            @media (max-width: 1600px) {
              font-size: 14px;
              line-height: 20px;
            }
          }
        }
        .enter-now-btn {
          .enter-now-btn {
            cursor: pointer;
            border-radius: 30px;
            border: 2px solid #4ee1f9;
            width: 100%;
            font-size: 26px;
            line-height: 26px;
            color: #4ee1f9;
            font-weight: 400;
            font-family: 'Goldman', sans-serif;
            background-color: rgba(34, 33, 33, 0.6);
            box-shadow: inset 4px 4px 40px 20px rgba(255, 255, 255, 0.1);
            padding: 15px;
            @media (max-width: 1600px) {
              font-size: 20px;
              padding: 10px;
              line-height: 20px;
            }
            &:hover {
              /* background-color: #0462a3;
              border-color: #0462a3; */
              background-color: #5de6fa;
              border-color: #5de6fa;
              color: #000;
              &.tw-connected-wallet {
                .tw-connected-wallet__address,
                .tw-connected-wallet__balance {
                  color: #000 !important;
                }
              }
            }
          }
        }
      }
    }
  }
  .game_end_message {
    position: relative;
    color: white;
    top: 350px;
    z-index: 1;
    left: 30px;
    font-size: 30px;
    font-family: revert;
    font-weight: 600;
  }
  .common-block-readius {
    padding: 20px;
    border-radius: 40px;
    background-color: rgba(34, 33, 33, 0.6);
    box-shadow: inset 4px 4px 40px 20px rgba(255, 255, 255, 0.1);
    @media (max-width: 767px) {
      padding: 15px;
      border-radius: 20px;
    }
    @media (max-width: 1199px) {
      border-radius: 20px;
    }
  }
  .table-history-block {
    width: 100%;
    margin-top: 60px;
    @media (max-width: 767px) {
      margin-top: 20px;
    }
    .table-history-block-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      .table-history-block-top-left {
        a {
          display: flex;
          align-items: center;
          text-decoration: none;
          p {
            padding-left: 20px;
            font-size: 30px;
            line-height: 30px;
            color: #fff;
            font-weight: 400;
            @media (max-width: 1400px) {
              font-size: 20px;
              line-height: 20px;
            }
          }
        }
      }
      .table-history-block-top-right {
        display: flex;
        margin: 0px -5px;
        .button-table-history {
          padding: 0px 5px;
          button {
            border: 2px solid #4ee1f9;
            border-radius: 30px;
            font-size: 20px;
            padding: 12px 30px;
            color: #4ee1f9;
            background-color: transparent;
            font-family: 'Goldman', sans-serif;
            cursor: pointer;
            @media (max-width: 1400px) {
              font-size: 20px;
              line-height: 20px;
              padding: 12px 25px;
            }
            @media (max-width: 767px) {
              font-size: 14px;
              line-height: 14px;
              padding: 10px 15px;
            }
            &:hover,
            &.active {
              background-color: #5de6fa;
              border-color: #5de6fa;
              color: #000;
              &.tw-connected-wallet {
                .tw-connected-wallet__address,
                .tw-connected-wallet__balance {
                  color: #000 !important;
                }
              }
              /* background-color: #dadcdc;
              color: #393939;
              border-color: #dadcdc; */
            }
          }
        }
      }
    }
    .table-history {
      border: 4px solid #dadcdc;
      /* background-color: rgba(255, 255, 255, 0.1); */
      border-radius: 40px;
      padding: 15px;
      @media (max-width: 1400px) {
        border-radius: 20px;
        padding: 15px;
      }
      .infinite-scroll-component {
        @media (max-width: 1400px) {
          overflow-x: scroll !important;
        }
      }
      table {
        width: 100%;
        @media (max-width: 1400px) {
          overflow-x: scroll;
          white-space: nowrap;
          width: 1700px;
          display: table;
        }
        th {
          padding: 30px 0px;
          font-size: 18px;
          color: rgba(255, 255, 255, 0.5);
          border-bottom: 1px solid #4ee1f9;
          text-align: left;
          cursor: pointer;
          @media (max-width: 1400px) {
            padding: 15px 0px;
            font-size: 16px;
          }
          span {
            &.round-th-span {
              position: relative;
              top: 8px;
              svg {
                width: 28px;
                height: 26px;
                transform: rotate(180deg);
              }
            }
            &.winner-text {
              position: relative;
              top: 5px;
            }
          }
          &.toggle-slide-th {
            span {
              &.round-th-span {
                svg {
                  width: 28px;
                  height: 26px;
                  transform: unset;
                }
              }
            }
          }
        }
        tbody {
          tr {
            cursor: pointer;
          }
        }
        td {
          padding: 15px 0px;
          border-bottom: 1px solid #4ee1f9;
          color: #fff;
          font-size: 16px;
          line-height: 16px;
          font-weight: 400;
          @media (max-width: 1400px) {
            padding: 10px 0px;
            font-size: 14px;
          }
          &.dark-text {
            color: rgba(255, 255, 255, 0.5);
          }
          &.bonus-first-text {
            color: #5ddfe6;
          }
          &.bonus-second-text {
            color: #46f511;
          }
          &.bonus-third-text {
            color: #ee8e10;
          }
          .winner-img-td {
            display: flex;
            align-items: center;
            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              object-fit: cover;
            }
            p {
              padding-left: 10px;
            }
          }
          .profile-img-plus-chain {
            display: flex;
            align-items: center;
            .profile-img-plus-chain-icon {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #d7dbfb;
              img {
                width: 100%;
              }
            }
            p {
              padding-left: 10px;
            }
          }
        }
        .history__share_btn {
          width: 40px;
          height: 40px;
          border-radius: 30px;
          border: none;
          margin-top: 10px;
          background-color: black;
          color: white;
        }
      }
    }
  }
  .profile-main {
    margin-top: 50px;
    width: 100%;
    @media (max-width: 1199px) {
      margin-top: 35px;
    }
    h2 {
      font-size: 30px;
      line-height: 30px;
      color: #fff;
      font-weight: 400;
      margin: 0px 0px 30px;
      text-align: center;
      @media (max-width: 1199px) {
        font-size: 26px;
        line-height: 26px;
        margin: 0px 0px 20px;
      }
    }
    .profile-main-flex {
      display: flex;
      margin: 0px -15px;
      @media (max-width: 1199px) {
        display: block;
        margin: 0px;
      }
      .profile-main-flex-inner-left {
        width: 30%;
        padding: 0px 15px;
        @media (max-width: 1199px) {
          width: 100%;
          padding: 0px 0px 15px;
        }
        .profile-main-flex-inner-left-inner {
          padding: 40px 20px;
          border-radius: 40px;
          background-color: rgba(34, 33, 33, 0.6);
          box-shadow: inset 4px 4px 40px 20px rgba(255, 255, 255, 0.1);
          border: 4px solid #dadcdc;
          text-align: center;
          @media (max-width: 991px) {
            padding: 15px;
            border: 2px solid #dadcdc;
            border-radius: 20px;
          }
          .profile-img-inner {
            margin-bottom: 30px;
            @media (max-width: 991px) {
              margin-bottom: 15px;
            }
            img {
              width: 200px;
              height: 200px;
              border-radius: 50%;
              object-fit: cover;
              @media (max-width: 991px) {
                width: 120px;
                height: 120px;
              }
            }
          }
          h3 {
            font-size: 24px;
            line-height: 30px;
            color: #fff;
            margin-bottom: 15px;
            font-weight: 400;
            @media (max-width: 991px) {
              font-size: 20px;
              line-height: 26px;
              margin-bottom: 10px;
            }
          }
          p {
            font-size: 16px;
            line-height: 20px;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 30px;
            font-weight: 400;
            @media (max-width: 991px) {
              font-size: 14px;
              line-height: 18px;
              margin-bottom: 15px;
            }
          }
          h5 {
            font-size: 18px;
            line-height: 22px;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 30px;
            font-weight: 400;
            @media (max-width: 991px) {
              font-size: 14px;
              line-height: 18px;
              margin-bottom: 15px;
            }
          }
          ul {
            margin: 0px -15px 40px;
            padding: 0px;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            li {
              padding: 0px 15px;
            }
          }
          .total-eth-main {
            margin: 0 auto;
            display: table;
            p {
              margin: 0px;
              font-size: 24px;
              line-height: 24px;
              color: #fff;
              box-shadow: 0px 4px 20px 10px rgba(255, 255, 255, 0.1);
              border: 2px solid #fff;
              padding: 12px 30px;
              border-radius: 30px;
              @media (max-width: 991px) {
                padding: 10px 15px;
                line-height: 18px;
                font-size: 18px;
              }
            }
          }
        }
      }
      .profile-main-flex-inner-right {
        width: 70%;
        padding: 0px 15px;
        @media (max-width: 991px) {
          width: 100%;
          padding: 0px;
        }
        .profile-main-flex-inner-right-inner {
          padding: 0px;
          border-radius: 40px;
          background-color: rgba(34, 33, 33, 0.6);
          box-shadow: inset 4px 4px 40px 20px rgba(255, 255, 255, 0.1);
          border: 4px solid #dadcdc;
          height: 99%;
          @media (max-width: 991px) {
            border: 2px solid #dadcdc;
            border-radius: 20px;
          }
          h3 {
            font-size: 24px;
            line-height: 24px;
            color: #fff;
            text-align: left;
            padding: 30px;
            font-weight: 400;
            border-bottom: 1px solid rgba(255, 255, 255, 0.22);
            @media (max-width: 991px) {
              padding: 15px;
              font-size: 18px;
              line-height: 18px;
            }
          }
        }
        .form-custom {
          padding: 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.22);
          @media (max-width: 991px) {
            padding: 15px;
          }
          .form-group {
            margin-bottom: 30px;
            @media (max-width: 991px) {
              margin-bottom: 15px;
            }
            &:last-child {
              margin: 0px;
            }
            .form-control {
              width: -webkit-fill-available;
              height: 50px;
              border-radius: 10px;
              background-color: rgba(255, 255, 255, 0.1);
              outline: none;
              border: none;
              padding: 4px 30px;
              font-weight: 400;
              font-size: 20px;
              line-height: 20px;
              color: rgba(255, 255, 255, 0.5);
              font-family: 'Goldman', sans-serif;
              cursor: pointer;
              @media (max-width: 991px) {
                height: 40px;
                padding: 4px 15px;
                font-size: 16px;
              }
            }
            textarea {
              height: 100px !important;
              padding: 10px 30px !important;
            }
          }
        }
        .update-block-custom {
          padding: 30px;
          @media (max-width: 991px) {
            padding: 15px;
            margin: 0 auto;
            display: table;
          }
          .update-btn {
            color: #5de6fa;
            background-color: transparent;
            font-size: 30px;
            line-height: 30px;
            border-radius: 30px;
            outline: none;
            border: 1px solid #5de6fa;
            padding: 14px 43px;
            font-family: 'Goldman', sans-serif;
            cursor: pointer;
            @media (max-width: 991px) {
              font-size: 20px;
              line-height: 20px;
              padding: 12px 30px;
            }
          }
          :hover {
            background-color: #5de6fa;
            border-color: #5de6fa;
            color: #000;
            &.tw-connected-wallet {
              .tw-connected-wallet__address,
              .tw-connected-wallet__balance {
                color: #000 !important;
              }
            }
          }
        }
      }
    }
  }
  .chat-block {
    margin-top: 50px;
    h2 {
      font-size: 30px;
      line-height: 30px;
      color: #fff;
      font-weight: 400;
      margin: 0px 0px 30px;
      text-align: center;
    }
    .chat-block-main {
      border-radius: 40px;
      background-color: rgba(34, 33, 33, 0.6);
      box-shadow: inset 4px 4px 40px 20px rgba(255, 255, 255, 0.1);
      border: 4px solid #dadcdc;
      padding: 30px;
      position: relative;
      min-height: 650px;
      .chat-block-top {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px 0px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        h3 {
          font-weight: 400;
          padding-left: 10px;
          font-size: 24px;
          line-height: 24px;
          margin: 0px;
          color: #fff;
        }
      }
      .chat-block-middle {
        height: 450px;
        overflow: auto;
        position: relative;
        top: 100px;
        .chat-left-block {
          display: inline-flex;
          align-items: flex-start;
          margin-bottom: 10px;
          width: 100%;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
          }
          h3 {
            font-weight: 400;

            font-size: 20px;
            line-height: 20px;
            margin: 0px;
            color: rgba(255, 255, 255, 0.5);
            background-color: rgba(255, 255, 255, 0.1);
            padding: 8px 12px;
            border-radius: 10px;
            margin-left: 10px;
          }
        }
        .chat-right-block {
          display: inline-flex;
          align-items: flex-end;
          margin-bottom: 10px;
          width: 100%;
          flex-direction: column;
          h3 {
            font-weight: 400;
            font-size: 20px;
            line-height: 20px;
            margin: 0px;
            color: rgba(255, 255, 255, 0.5);
            background-color: rgba(255, 255, 255, 0.1);
            padding: 8px 12px;
            border-radius: 10px;
            margin-left: 10px;
          }
        }
      }
      .chat-block-bottom {
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        padding: 30px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        .chat-block-bottom-inner {
          .form-group {
            margin: 0px;
            .form-control {
              width: -webkit-fill-available;
              height: 41px;
              border-radius: 30px;
              background-color: rgba(255, 255, 255, 0.1);
              outline: none;
              border: none;
              padding: 18px 75px 0px 24px;
              font-weight: 400;
              font-size: 20px;
              line-height: 20px;
              color: rgba(255, 255, 255, 0.5);
              font-family: 'Goldman', sans-serif;
              resize: none;
            }
          }
          button {
            position: absolute;
            top: 37px;
            right: 37px;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background-color: #dadcdc;
            outline: none;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
          }
        }
      }
    }
  }
  .faq-main {
    width: 100%;
    margin-top: 60px;
    @media (max-width: 991px) {
      margin-top: 50px;
    }
    .faq-main-top {
      padding: 15px 0px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
      @media (max-width: 991px) {
        padding: 10px 0px;
      }
      .back_btn {
        position: absolute;
        left: 0px;
        top: 15px;
        @media (max-width: 767px) {
          top: -15px;
        }
      }
      h2 {
        font-size: 26px;
        line-height: 30px;
        color: #fff;
        margin: 0px;
        font-weight: 500;
        @media (max-width: 1199px) {
          font-size: 22px;
          line-height: 28px;
        }
      }
    }
    .data-faq-block {
      border: 4px solid #dadcdc;
      border-radius: 40px;
      padding: 0px 30px 30px;
      background-color: rgba(34, 33, 33, 0.6);
      box-shadow: inset 4px 4px 40px 20px rgba(255, 255, 255, 0.1);
      margin-top: 15px;
      @media (max-width: 1199px) {
        border: 2px solid #dadcdc;
        border-radius: 20px;
        padding: 0px 15px 15px;
      }
      span a {
        color: #5de6fa;
        cursor: pointer;
        text-decoration: none;
      }
      .data-faq-block-inner {
        padding: 30px 0px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.2);
        @media (max-width: 991px) {
          padding: 15px 0px;
        }
        &:last-child {
          border-bottom: none;
          padding-bottom: 0px;
        }
        h3 {
          font-size: 24px;
          line-height: 26px;
          color: #5de6fa;
          font-weight: 500;
          margin-bottom: 20px;
          @media (max-width: 991px) {
            font-size: 20px;
            line-height: 26px;
            margin-bottom: 15px;
          }
        }
        p {
          padding-left: 25px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 18px;
          line-height: 26px;
          margin: 0px;
          @media (max-width: 991px) {
            font-size: 16px;
            line-height: 22px;
          }
        }
      }
      .data-refer-block {
        padding: 15px 0px;
        ul {
          margin-bottom: 30px;
          padding: 0px;
          li {
            position: relative;
            font-size: 24px;
            line-height: 26px;
            color: #fff;
            padding-left: 25px;
            margin-bottom: 15px;
            list-style: none;
            span {
              color: #5de6fa;
            }
            @media (max-width: 1199px) {
              font-size: 20px;
              line-height: 24px;
            }
            @media (max-width: 991px) {
              font-size: 18px;
              line-height: 24px;
            }
            &::before {
              content: '';
              position: absolute;
              left: 0px;
              top: 7px;
              width: 10px;
              height: 10px;
              background-color: #5de6fa;
              border-radius: 50%;
              @media (max-width: 991px) {
                width: 8px;
                height: 8px;
              }
            }
          }
        }
        .table-custom-block {
          display: flex;
          margin: 0px -30px;
          align-items: flex-end;
          @media (max-width: 991px) {
            display: block;
            margin: 0px;
          }
          .table-custom-block-left {
            width: 450px;
            padding: 0px 30px;
            @media (max-width: 991px) {
              width: 100%;
              padding: 0px 0px 15px;
            }
            .table-custom-block-left-inner {
              padding: 10px 10px 0px 10px;
              margin-bottom: 40px;
              border: 1px solid #828281;
              @media (max-width: 991px) {
                margin-bottom: 15px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th {
                padding: 20px 0px;
                color: #fff;
                font-size: 18px;
                line-height: 18px;
                font-weight: 700;
                width: 50%;
                text-align: left;
                border-bottom: 1px solid #828281;
                @media (max-width: 1199px) {
                  padding: 10px 0px;
                  font-size: 16px;
                  line-height: 16px;
                }
              }
              tbody {
                tr {
                  &:last-child {
                    td {
                      border: none;
                    }
                  }
                  td {
                    padding: 20px 0px;
                    color: #fff;
                    font-size: 16px;
                    line-height: 16px;
                    border-bottom: 1px solid #828281;
                    @media (max-width: 1199px) {
                      padding: 10px 0px;
                      font-size: 14px;
                      line-height: 14px;
                    }
                    span {
                      color: #5ddfe6;
                    }
                  }
                }
              }
              &.pad-none-block {
                th {
                  padding: 0px;
                  border: none;
                }
              }
            }
          }
          .table-custom-block-right {
            width: 450px;
            padding: 0px 30px;
            @media (max-width: 991px) {
              width: 100%;
              padding: 0px 0px 15px;
            }
            .table-custom-block-right-inner {
              padding: 10px 10px 0px 10px;
              margin-bottom: 40px;
              border: 1px solid #828281;
              @media (max-width: 991px) {
                margin-bottom: 15px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th {
                padding: 20px 0px;
                color: #fff;
                font-size: 18px;
                line-height: 18px;
                font-weight: 700;
                width: 50%;
                text-align: left;
                border-bottom: 1px solid #828281;
                @media (max-width: 1199px) {
                  padding: 10px 0px;
                  font-size: 16px;
                  line-height: 16px;
                }
                @media (max-width: 991px) {
                  padding: 10px 0px;
                  font-size: 14px;
                  line-height: 14px;
                }
              }
              tbody {
                tr {
                  &:last-child {
                    td {
                      border: none;
                    }
                  }
                  td {
                    padding: 20px 0px;
                    color: #fff;
                    font-size: 16px;
                    line-height: 16px;
                    border-bottom: 1px solid #828281;
                    @media (max-width: 1199px) {
                      padding: 10px 0px;
                      font-size: 14px;
                      line-height: 14px;
                    }
                    @media (max-width: 991px) {
                      padding: 10px 0px;
                      font-size: 13px;
                      line-height: 13px;
                    }
                    span {
                      color: #5de6fa;
                    }
                  }
                }
              }
              &.pad-none-block {
                th {
                  padding: 0px;
                  border: none;
                }
              }
            }
          }
        }
      }
    }
    .faq-bottom {
      display: flex;
      align-items: center;
      padding: 50px 0px 40px;
      @media (max-width: 1199px) {
        padding: 30px 0px;
      }
      @media (max-width: 767px) {
        display: block;
        padding: 25px 0px;
      }
      p {
        font-size: 24px;
        line-height: 32px;
        color: #fff;
        width: 70%;
        padding-right: 15px;
        a {
          color: #fff;
          text-decoration: none;
        }
        @media (max-width: 1199px) {
          font-size: 20px;
          line-height: 26px;
        }
        @media (max-width: 767px) {
          font-size: 18px;
          line-height: 24px;
          margin-bottom: 10px;
          width: 100%;
        }
      }
      ul {
        width: 30%;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        margin: 0px -8px;
        padding: 0px;
        list-style: none;
        @media (max-width: 767px) {
          width: 100%;
          align-items: flex-start;
          justify-content: flex-start;
        }
        li {
          padding: 0px 8px;
          a {
            svg {
              width: 50px;
              @media (max-width: 991px) {
                width: 40px;
              }
            }
          }
        }
      }
    }
  }
  .maintance-block-center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 40px;
    @media (max-width: 991px) {
      padding: 15px;
      width: 100%;
    }
    .maintance-block-center-inner {
      position: relative;
      text-align: center;
      h3 {
        font-size: 24px;
        line-height: 32px;
        color: #fff;
        font-weight: 500;
        margin-bottom: 30px;
        @media (max-width: 991px) {
          font-size: 20px;
          margin-bottom: 15px;
          line-height: 26px;
        }
      }
      .form-group {
        position: relative;
        width: 600px;
        margin: 0 auto;
        @media (max-width: 991px) {
          width: 100%;
        }
        input {
          height: 40px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          padding: 10px 165px 10px 15px;
          font-size: 20px;
          color: #fff;
          border: none;
          outline: none;
          box-shadow: none;
          max-width: 100%;
          width: -webkit-fill-available;
          font-family: 'Goldman', sans-serif;
          @media (max-width: 991px) {
            font-size: 18px;
            padding: 10px 125px 10px 15px;
          }
        }
        button {
          position: absolute;
          right: 7px;
          top: 7px;
          background-color: #dadcdc;
          border-radius: 10px;
          color: #393939;
          font-size: 18px;
          border: none;
          font-family: 'Goldman', sans-serif;
          cursor: pointer;
          border: none;
          padding: inherit;
          width: 150px;
          height: 47px;
          @media (max-width: 991px) {
            font-size: 14px;
            width: 100px;
            height: 47px;
          }
        }
      }
    }
  }
`;
export const ChatBlock = styled.div`
  position: relative;
  .chat-block-icon {
    position: fixed;
    right: 25px;
    bottom: 25px;
    z-index: 9;
    @media (max-width: 767px) {
      right: 15px;
      bottom: 15px;
    }
    a {
      width: 70px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #5de6fa;
      @media (max-width: 767px) {
        width: 50px;
        height: 50px;
        img {
          width: 30px !important;
          height: 30px !important;
        }
      }
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
  .close-icon-main {
    position: fixed;
    right: 10px;
    bottom: 460px;
    z-index: 99;
    @media (max-width: 767px) {
      bottom: 350px;
    }
    a {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #5de6fa;
      @media (max-width: 767px) {
        width: 40px;
        height: 40px;
      }
      img {
        width: 30px;
        height: 30px;
        @media (max-width: 767px) {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  .chat-block-open {
    width: 400px;
    height: 400px;
    position: fixed;
    bottom: 90px;
    right: 25px;
    z-index: 9;
    @media (max-width: 767px) {
      width: 280px;
      height: 280px;
    }
    .chat-block-main {
      border-radius: 40px;
      background-color: rgba(34, 33, 33, 1);
      box-shadow: inset 4px 4px 40px 20px rgba(255, 255, 255, 0.1);
      border: 4px solid #5de6fa;
      padding: 30px;
      position: relative;
      min-height: 400px;
      @media (max-width: 767px) {
        padding: 15px;
        min-height: 320px;
        border-radius: 20px;
        border: 2px solid #5de6fa;
      }
      .chat-block-top {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px 0px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          object-fit: cover;
        }
        h3 {
          font-weight: 400;
          padding-left: 10px;
          font-size: 20px;
          line-height: 20px;
          margin: 0px;
          color: #fff;
        }
      }
      .chat-block-middle {
        height: 320px;
        overflow: auto;
        position: relative;
        top: 0px;
        @media (max-width: 767px) {
          height: 240px;
        }
        .chat-left-block {
          display: inline-flex;
          align-items: flex-start;
          margin-bottom: 10px;
          width: 100%;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            object-fit: cover;
          }
          h3 {
            font-weight: 400;

            font-size: 16px;
            line-height: 18px;
            margin: 0px;
            color: rgba(255, 255, 255, 0.5);
            background-color: rgba(255, 255, 255, 0.1);
            padding: 8px 12px;
            border-radius: 10px;
            margin-left: 10px;
          }
        }
        .chat-right-block {
          display: inline-flex;
          align-items: flex-end;
          margin-bottom: 10px;
          width: 100%;
          flex-direction: column;
          h3 {
            font-weight: 400;
            font-size: 16px;
            line-height: 18px;
            margin: 0px;
            color: rgba(255, 255, 255, 0.5);
            background-color: rgba(255, 255, 255, 0.1);
            padding: 8px 12px;
            border-radius: 10px;
            margin-left: 10px;
          }
        }
      }
      .chat-block-bottom {
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        padding: 15px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        .chat-block-bottom-inner {
          .form-group {
            margin: 0px;
            .form-control {
              width: -webkit-fill-available;
              height: 41px;
              border-radius: 30px;
              background-color: rgba(255, 255, 255, 0.1);
              outline: none;
              border: none;
              padding: 18px 75px 0px 24px;
              font-weight: 400;
              font-size: 16px;
              line-height: 16px;
              color: rgba(255, 255, 255, 0.5);
              font-family: 'Goldman', sans-serif;
              resize: none;
              @media (max-width: 767px) {
                font-size: 13px;
                line-height: 13px;
              }
            }
          }
          button {
            position: absolute;
            top: 21px;
            right: 21px;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background-color: #dadcdc;
            outline: none;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
          }
        }
      }
    }
  }
`;