import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/query';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  let {loading, data} = useQuery(QUERY_ME);
  let [removeBook, {}] = useMutation(REMOVE_BOOK);
  
  var user = data?.me  || {};


async function handleDeleteBook(bookId) {
    {let token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) return false;
    }
    
    try {
      await removeBook( {
        variables: { bookId: bookId }
      });
      
      removeBookId(bookId);

    } catch(err) {
      console.error(err);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (!user?.username) return <h4>You need to be logged in!</h4>

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {user.savedBooks.length
            ? `Viewing ${user.savedBooks.length} saved ${user.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {user.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
