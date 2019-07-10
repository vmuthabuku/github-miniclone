import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import styled from 'styled-components';
import 'styled-components/macro';
import RepoCard from './repCard'
import Avatar from './avatar'


const GET_USER_ACTIVITY = gql`
query($user:String!) { 
    user(login:$user){
      id
      avatarUrl
      starredRepositories(last:6){
        edges{
          node{
            id
            createdAt
            viewerHasStarred
            nameWithOwner
            owner{
              avatarUrl
            }
            url
            repositoryTopics(first:2){
              edges{
                node{
                  id
                  topic{
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
      
    }
      
  }
`

const ColumnWrapper = styled('section')({
  width: '100%',
	maxWidth: '100%',
	backgroundColor: '#fafafa',
	borderRight: '2px solid #eee',
	padding: 15,
	height: '100vh',
	//overflowY: 'auto'
})

const Column = ({user}) =>{
    return(
        <ColumnWrapper>
        <Query query={GET_USER_ACTIVITY} variables={{user}}>
            {({ loading, error, data})=>(
                <>
                    {loading && <div>loading..</div>}
                    {error && <div>{JSON.stringify(error)}</div>}
                    {data && data.user && (
                      <>
                      <div
                          css={{
                            alignItems: 'center',
                            display: 'flex',
                            padding: '0 0 16px',
                          }}
                        >
                          <Avatar src={data.user.avatarUrl} width={25} height={25} />
                          <div css={{ marginLeft: 12 }}>{user}</div>
							        </div>
                      {data.user.starredRepositories.edges.map(({ node }) => (
                      <RepoCard data={node} key={node.id} />
                    ))}
                      </>
                    )}
                </>
                                
            )}
        </Query>
        </ColumnWrapper>
    )
    
}
export default Column

