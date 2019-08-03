/* global chrome */
const util = require('util')

class Chrome {
  async getReadingListAsync() {
    let folders = await this.getReadingListFolderAsync()
    if (!folders || folders.length === 0) {
      return await this.createFolderAsync(this.READING_LIST_TITLE)
    } else {
      const subTree = await this.getSubTreeAsync(folders[0].id)
      if (subTree && subTree.length > 0) {
        return subTree[0].children
      }
    }
  }

  getReadingListFolderAsync = util.promisify(callback => {
    chrome.bookmarks.search({ title: 'Reading List', url: null }, bookmarks => {
      callback(null, bookmarks)
    })
  })

  getSubTreeAsync = util.promisify((id, callback) => {
    chrome.bookmarks.getSubTree(id, bookmarks => {
      callback(null, bookmarks)
    })
  })

  createFolderAsync = util.promisify((title, parentId, callback) => {
    chrome.bookmarks.create({ parentId, title }, newFolder => {
      callback(null, newFolder)
    })
  })

  createBookmarkAsync = util.promisify((title, url, parentId, callback) => {
    chrome.bookmarks.create({ title, url, parentId }, bookmark => {
      callback(null, bookmark)
    })
  })

  removeBookmarkAsync = util.promisify((id, callback) => {
    chrome.bookmarks.remove(id, () => {
      callback(null, null)
    })
  })

  getCurrentTabAsync = util.promisify(callback => {
    chrome.tabs.getCurrent(tab => {
      callback(null, tab)
    })
  })

  updateTabAsync = util.promisify((id, url, callback) => {
    chrome.tabs.update(id, { url }, result => {
      callback(null, result)
    })
  })

  async openTabAsync(url) {
    const tab = await this.getCurrentTabAsync()
    await this.updateTabAsync(tab.id, url)
  }
}

export default Chrome
