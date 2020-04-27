import React from "react";
import PartyCard from "../components/party-card";
import { withRouter } from "react-router-dom";
import getPartiesService from "../services/parties/get-query";
import voteService from "../services/votes/create";
import checkUserVoteService from "../services/votes/check-user";
import socket from "../services/socket";

const VoteFlagMessage = ({ message, isvote }) => {
  if (isvote) {
    return <h2 style={{ textAlign: "center", color: "red" }}>{message}</h2>;
  }

  return <h2 style={{ textAlign: "center" }}>{message}</h2>;
};

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listParties: [],
      votedMessage: {
        message: `you don't vote`,
        isVoted: false,
      },
    };

    this.onVote = this.onVote.bind(this);
  }

  componentDidMount() {
    checkUserVoteService().catch(() => {
      this.setState((prev) => {
        prev["votedMessage"] = { message: `you voted`, isVoted: true };
        return prev;
      });
    });

    socket.on("on vote", (data) => {
      this.setState((prev) => {
        const partyIndex = prev.listParties
          .map((party) => party.id)
          .indexOf(data.id);
        prev.listParties[partyIndex].score = data.score;
        return prev;
      });
    });

    const fetchParties = async () => {
      try {
        const result = await getPartiesService();
        this.setState((prev) => {
          prev["listParties"] = result.data;
          return prev;
        });
        return result.data;
      } catch (e) {
        console.log(e.response);
        this.props.history.push("/");
      }
    };

    fetchParties();
  }

  async onVote(partyId) {
    try {
      await voteService(partyId);
      this.setState((prev) => {
        prev["votedMessage"] = {
          message: `you voted`,
          isVoted: true,
        };
        return prev;
      });
    } catch (e) {
      console.log(e);
      this.setState((prev) => {
        prev["votedMessage"] = {
          message: `you voted`,
          isVoted: true,
        };
      });
    }
  }

  render() {
    const { votedMessage, listParties } = this.state;
    return (
      <div>
        <VoteFlagMessage
          message={votedMessage.message}
          isvote={votedMessage.isVoted}
        />
        <div className="row" style={{ justifyContent: "center" }}>
          {listParties.map(({ name, description, id, score }, index) => {
            return (
              <div className="sm-12 md-4 lg-4 col" key={index}>
                <PartyCard
                  name={name}
                  description={description}
                  id={id}
                  score={score}
                  onClick={this.onVote}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(IndexPage);
