import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Avatar from './avatar'
import 'styled-components/macro';

const GET_VIEWERS = gql`
    query{
        viewer{
            login
            avatarUrl
            websiteUrl
        }
    }

`
function SideBar() {
    return (
        <aside>
            <Query query={GET_VIEWERS}>
                {({loading, error, data}) => (
                    <>
                        {loading && <div>loading..</div>}
                        {error && <div>Error</div>}
                        {data && data.viewer && (
                            <Avatar src={data.viewer.avatarUrl} alt={data.viewer.login}/>
                        )}
                    </>
                )}
            </Query>

            <div
            css={{ color: 'rgb(210, 54, 105)', cursor: 'pointer' }}
            onClick={()=> {
            localStorage.clear()
            window.location.reload()
          }}>Logout</div> 

        </aside>
       
    )
}

export default SideBar
