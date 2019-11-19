import React from 'react'
import Button from '../Button'
import './ReadingList.css'

const ReadingList = ({ list, open, remove }) => {
  return (
    <div className="ReadingList">
      <ul className="ReadingList-list">
        {list.map(site => (
          <li className="ReadingList-item" key={site.id}>
            <img
              className="ReadingList-image"
              src={`https://www.google.com/s2/favicons?domain=${site.url}`}
              alt=""
            />
            <Button
              onClick={() => {
                open(site.url)
              }}
            >
              {site.title}
            </Button>

            <button
              style={{ margin: '5px' }}
              className="primary"
              onClick={() => {
                remove(site.id)
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ReadingList
