import { useState } from "react";

const Header = ({ heading }) => {
  return <h1> {heading} </h1>;
};

const Button = (props) => {
  return <button onClick={props.onClick}> {props.text} </button>;
};

const Anecdote = ({ text, voteCount }) => {
  return (
    <div>
      <p> {text} </p>
      <p>has {voteCount} votes</p>
    </div>
  );
};

const Winner = ({ anecdotes, vote }) => {
  const maxVotes = Math.max(...vote);
  const winnerIndex = vote.indexOf(maxVotes);
  const winner = anecdotes[winnerIndex];

  if (maxVotes === 0) {
    return <p>No votes yet.</p>;
  }

  return (
    <div>
      <p>{winner}</p>
      <p> has {maxVotes} votes </p>
    </div>
  );
};

const App = () => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(7).fill(0));
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const countVote = () => {
    const allNewVotes = [...vote];
    allNewVotes[selected] += 1;
    setVote(allNewVotes);
  };

  const nextAnectode = () => {
    const arrayIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(arrayIndex);
  };

  return (
    <div>
      <Header heading="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} voteCount={vote[selected]} />
      <Button text="vote" onClick={countVote} />
      <Button text="next anecdote" onClick={nextAnectode} />
      <Header heading="Anectode with most votes" />
      <Winner anecdotes={anecdotes} vote={vote} />
    </div>
  );
};

export default App;
