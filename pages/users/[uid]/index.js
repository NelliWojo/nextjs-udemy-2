import React from "react";

export default function UserIdPage(props) {
  return <div>{props.id}</div>;
}

// no pre-generation, page is loaded on client request
export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
