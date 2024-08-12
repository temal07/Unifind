import React from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UserTables({ user }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
        <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>See Profile</Table.HeadCell>
            </Table.Head>
              <Table.Body className='divide-y' key={user._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {
                      currentUser && currentUser._id === user._id ? (
                        <Link to={`/profile/${user._id}`} className='text-blue-500'>
                          See Profile
                        </Link>
                      ) : (
                        <Link to={`/user/${user._id}`} className='text-blue-500'>
                          See Profile
                        </Link>
                      )
                    }
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
          </Table>
    </div>
  )
}
