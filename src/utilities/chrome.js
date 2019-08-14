import util from 'util'

const READING_LIST_TITLE = 'Reading List'

export const getReadingListAsync = async () => {
  let folders = await getReadingListFolderAsync()
  if (!folders || folders.length === 0) {
    return await createFolderAsync(READING_LIST_TITLE)
  } else {
    const subTree = await getSubTreeAsync(folders[0].id)
    if (subTree && subTree.length > 0) {
      return subTree[0].children
    }
  }
}

export const saveToReadingListAsync = async () => {
  const tab = await getCurrentTabAsync()
  let parentId
  let folders = await getReadingListFolderAsync()
  if (!folders || folders.length === 0) {
    parentId = (await createFolderAsync(READING_LIST_TITLE)).id
  } else {
    parentId = folders[0].id
  }
  await createBookmarkAsync(tab.title, tab.url, parentId)
}

export const openTabAsync = async url => {
  const tab = await getCurrentTabAsync()
  await updateTabAsync(tab.id, url)
}

export const getReadingListFolderAsync = util.promisify(callback => {
  chrome.bookmarks.search({ title: 'Reading List', url: null }, bookmarks => {
    callback(null, bookmarks)
  })
})

export const getSubTreeAsync = util.promisify((id, callback) => {
  chrome.bookmarks.getSubTree(id, bookmarks => {
    callback(null, bookmarks)
  })
})

export const createFolderAsync = util.promisify((title, parentId, callback) => {
  chrome.bookmarks.create({ parentId, title }, newFolder => {
    callback(null, newFolder)
  })
})

export const createBookmarkAsync = util.promisify(
  (title, url, parentId, callback) => {
    chrome.bookmarks.create({ title, url, parentId }, bookmark => {
      callback(null, bookmark)
    })
  }
)

export const removeBookmarkAsync = util.promisify((id, callback) => {
  chrome.bookmarks.remove(id, () => {
    callback(null, null)
  })
})

export const getCurrentTabAsync = util.promisify(callback => {
  chrome.tabs.query({ active: true, currentWindow: true }, arrayOfTabs => {
    callback(null, arrayOfTabs[0])
  })
})

export const updateTabAsync = util.promisify((id, url, callback) => {
  chrome.tabs.update(id, { url }, result => {
    callback(null, result)
  })
})
