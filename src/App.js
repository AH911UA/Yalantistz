import React, { useEffect, useState } from "react";
import "./styles.css";

import { Card } from "./components/Card";
import { User } from "./components/User";

const monthes = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

const initState = {
  error: null,
  loading: true,
  items: []
};

export default function App() {
  const [reqState, setState] = useState(initState);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("https://yalantis-react-school-api.yalantis.com/api/task0/users")
      .then(response => response.json())
      .then(
        result => {
          setState(prevState => {
            return {
              ...prevState,
              loading: false,
              items: addMonthOfBirth(result)
            };
          });
        },
        error => {
          setState(prevState => {
            return {
              ...prevState,
              loading: false,
              error
            };
          });
        }
      );
  }, []);

  const { items, loading, error } = reqState;

  const addMonthOfBirth = list => {
    return list.map(function (item) {
      const date = new Date(item.dob);
      const month = date
        .toLocaleString("en", { month: "long" })
        .toLowerCase();
      return {
        ...item,
        month
      };
    });
  };

  const monthStyle = month => {
    const counter = getCounter(month);
    switch (true) {
      case counter <= 2:
        return "gray";
      case counter >= 3 && counter <= 6:
        return "blue";
      case counter >= 7 && counter <= 10:
        return "green";
      case counter >= 11:
        return "red";
      default:
        return "";
    }
  };

  const groupByMonth = list => {
    return list.reduce((acc, obj) => {
      const value = obj.month;
      acc[value] = acc[value] || [];
      acc[value].push(obj);
      return acc;
    }, {});
  };

  const show = month => {
    const currentUsers = groupByMonth(items)[month];
    setUsers(currentUsers);
  };

  const hide = () => {
    setUsers(null);
  };

  const getCounter = month => {
    return items && items.length && groupByMonth(items)[month].length;
  };

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error!!! </div>;
  }

  return (
    <div className="App">
      <div className="main">
        <div>
          {monthes.map(item => (
            <Card
              name={item}
              style={monthStyle(item)}
              count={getCounter(item)}
              key={item}
              open={() => show(item)}
              hide={() => hide()}
            />
          ))}
        </div>
        <div className="column">
          {users &&
            users.map(user => (
              <User
                name={user.firstName}
                lastName={user.lastName}
                key={user.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
