import React from "react";

const activityDetail = () => {
  return (
    <div>
      <h1>detail</h1>
    </div>
  );
};

export default activityDetail;

export async function getServerSideProps(context) {
  const param = context.params || { id: "" };
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sport-activities/${param.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.req.cookies.token}`,
        },
      }
    );
    return { props: { data: res.data.result.data || [] } };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { props: { data: {} } };
  }
}
