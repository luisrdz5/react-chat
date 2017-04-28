import React from 'react'

function ChatInput ({ onSendMessage }) {
  function handleSubmit (e) {
    e.preventDefault()
    onSendMessage(e.target.text.value)
    e.target.text.value = ''
}
return (
    <form className='page-footer blue lighten-4' onSubmit={handleSubmit}>
      <div className='container row'>
        <div className='col s9'>
          <input name='text' type='text' />
        </div>
        <div className='col s3'>
          <button className='btn waves-effect waves-light blue darken-1' type='submit'>
            Enviar
          </button>
        </div>
      </div>
    </form>
  )
}

export default ChatInput