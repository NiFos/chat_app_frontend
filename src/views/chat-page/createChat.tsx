import { useLazyQuery } from "@apollo/client";
import React from "react";
import { Button } from "../../components/button";
import { Divider } from "../../components/divider";
import { Input } from "../../components/Input";
import { chatQuery } from "../../graphql/queries/chat.query";

export interface Iuser {
  id: string;
  username: string;
}
interface Props {
  submit: (users: Iuser[], name: string) => void;
}

export function CreateChat(props: Props) {
  const [name, setName] = React.useState("");
  const [userSearch, setUserSearch] = React.useState("");
  const [users, setUsers] = React.useState<Iuser[]>([]);
  const [search, searchData] = useLazyQuery(chatQuery.SEARCH_USER);
  return (
    <div className="pb-3 mt-3 bg-blue-400 p-3 rounded bg-opacity-25">
      <span>Chat name: </span>
      <Input
        value={name}
        onChange={(value) => setName(value)}
        name="name"
        placeholder="Enter chat name"
      />
      <div>
        <Divider />
        <div>
          <div>
            <span>Users: </span>
            {users.map((item) => {
              return <span key={item.id}>{item.username}</span>;
            })}
          </div>
          <div>
            <span>Search: </span>
            <Input
              value={userSearch}
              onChange={(value) => setUserSearch(value)}
              name={"usersearch"}
              placeholder="Enter user username"
            />
            <Button
              className="bg-white mt-1 ml-3 p-1 text-blue-500 rounded"
              onClick={() =>
                search({
                  variables: {
                    search: `%${userSearch}%`,
                  },
                })
              }
            >
              Search
            </Button>
          </div>
        </div>
        <Divider />
        <div>
          {!searchData.loading &&
            searchData?.data?.users.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="p-2 m-2 text-white bg-blue-400 rounded flex justify-between"
                >
                  <span>"{item.username}"</span>
                  <Button
                    className="bg-green-400 text-white hover:bg-opacity-75 rounded pl-1 pr-1"
                    onClick={() =>
                      setUsers([
                        ...users,
                        { id: item.id, username: item.username },
                      ])
                    }
                  >
                    <span>Add</span>
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
      <Button
        className="rounded bg-blue-400 p-3 text-white"
        onClick={() => props.submit(users, name)}
      >
        Create chat
      </Button>
    </div>
  );
}
