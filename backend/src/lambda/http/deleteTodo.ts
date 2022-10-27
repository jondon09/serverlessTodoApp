import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
//import { deleteToDo } from '../../helpers/todos'
import { deleteTodo } from '../../dataLayer/todosAcess'
import { getUserId } from '../utils'

// import { deleteTodo } from '../../businessLogic/todos'
// import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const todoId = event.pathParameters.todoId

        const userId = getUserId(event)
        await deleteTodo(todoId, userId)
    
        return {
          statusCode: 200,
          body: ''
        }
  }
    // TODO: Remove a TODO item by id
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
