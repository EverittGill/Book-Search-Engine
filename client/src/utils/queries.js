import { gql } from '@apollo/client';

export const QUERY_USER = gql`  
    query user($username: String!) {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

