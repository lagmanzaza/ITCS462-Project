import React, { useState, useEffect } from "react";
import PartyCard from "../components/party-card";
import { withRouter } from "react-router-dom";
import getPartiesService from "../services/parties/get-query";
import voteService from "../services/votes/create";
import socketIOClient from "socket.io-client";
import checkUserVoteService from "../services/votes/check-user";

const ENDPOINT = "http://127.0.0.1:3030";

const onVote = async (setVotedMessage, partyId) => {
  try {
    await voteService(partyId);
    setVotedMessage({
      message: `you voted`,
      isVoted: true,
    });
  } catch (e) {
    console.log(e);
    setVotedMessage({
      message: `you vote`,
      isVoted: true,
    });
  }
};

const VoteFlagMessage = ({ message, isvote }) => {
  if (isvote) {
    return <h2 style={{ textAlign: "center", color: "red" }}>{message}</h2>;
  }

  return <h2 style={{ textAlign: "center" }}>{message}</h2>;
};

/* eslint-disable */
export default withRouter((props) => {
  const [listParties, setParties] = useState([]);
  const [votedMessage, setVotedMessage] = useState({
    message: `you don't vote`,
    isVoted: false,
  });
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("on vote", (data) => {
      setParties((parties) => {
        const partyIndex = parties.map((party) => party.id).indexOf(data.id);
        parties[partyIndex].score = data.score;
        return parties;
      });
    });

    const fetchCheckUser = async () => {
      try {
        await checkUserVoteService();
      } catch (e) {
        setVotedMessage({
          message: `you voted`,
          isVoted: true,
        });
      }
    };

    const fetchParties = async () => {
      try {
        const result = await getPartiesService();
        setParties(result.data);
        return result.data;
      } catch (e) {
        console.log(e.response);
        props.history.push("/");
      }
    };

    fetchCheckUser().then(() => {
      fetchParties();
    });
  }, []);
  return (
    <div>
      <VoteFlagMessage
        message={votedMessage.message}
        isvote={votedMessage.isVoted}
      />
      <div className="row">
        {listParties.map(({ name, description, id, score }, index) => {
          return (
            <div className="col-4 col" key={index}>
              <PartyCard
                name={name}
                description={description}
                id={id}
                score={score}
                onClick={onVote}
                setVoteMessage={setVotedMessage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});
