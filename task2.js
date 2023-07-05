import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Navbar = styled.nav`
  background: #333;
  padding: 1rem;
  color: white;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Loader = styled.div`
  text-align: center;
  margin: 2rem;
  font-size: 1.5rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 2rem;
`;

const UserCard = styled.div`
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 4px;
`;

const Avatar = styled.img`
  width: 100%;
  max-width: 150px;
  height: auto;
`;

const Name = styled.h3`
  margin: 0.5rem 0;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar>
        <h2>Brand Name</h2>
        <Button onClick={fetchUsers} disabled={loading}>
          {loading ? 'Loading...' : 'Get Users'}
        </Button>
      </Navbar>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CardGrid>
          {users.map(user => (
            <UserCard key={user.id}>
              <Avatar src={user.avatar} alt={user.first_name} />
              <Name>{`${user.first_name} ${user.last_name}`}</Name>
              <p>{user.email}</p>
            </UserCard>
          ))}
        </CardGrid>
      )}
    </div>
  );
}

export default App;
