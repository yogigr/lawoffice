import CircularButton from "@/Components/CircularButton";
import { TrashIcon } from "@heroicons/react/outline";

const DeleteButton = ({ onDelete }) => (
  <div className="text-right">
    <CircularButton
      className="bg-gray-100 hover:bg-gray-200 focus:ring-gray-200"
      onClick={onDelete}
    >
      <TrashIcon className="w-4 h-4" />
    </CircularButton>
  </div>
)

export default function MessageList({ messages, onDelete, auth }) {
  return (
    <div>
      <div className="flow-root mt-6">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {messages.data.map((message, index) => (
            <li key={index} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img className="h-8 w-8 rounded-full" src={message.user.picture} alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{message.user.name}</p>
                  <p className="text-sm text-gray-500 truncate">{message.role}</p>
                </div>
                <div>
                  <div>
                    <time dateTime={message.created_at} className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                      {message.created_at}
                    </time>
                  </div>
                  {
                    auth.user.role_id == 1 ? (

                      <DeleteButton onDelete={() => onDelete(message)} />

                    ) : auth.permissions.includes('delete-message') && auth.user.id === message.user_id ? (

                      <DeleteButton onDelete={() => onDelete(message)} />

                    ) : null
                  }
                </div>
              </div>
              <div className="mt-1">
                <p className="line-clamp-2 text-sm text-gray-600">{message.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
