import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import * as listActions from 'Shared/actions/listActions'
import { saveToReadingListAsync } from 'Utilities/chrome';
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
  componentWillMount() {
    const { lists, dispatch } = this.props

    if (lists.records.size === undefined) {
      dispatch(listActions.requestRefresh())
    }
  }

  optionWithDefaultValue(options) {
    const { lists } = this.props

    for (const option of options) {
      if (option.value === lists.activeId) {
        return option.value
      }
    }

    return options[0]
  }

  async submitCurrentURL() {
    const { dispatch, lists } = this.props
    const activeListId = lists.activeId

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      arrayOfTabs => {
        const activeTab = arrayOfTabs[0]
        const url = activeTab.url
        const title = activeTab.title

        alert(url)

        dispatch(listActions.requestURLSubmit(activeListId, url, title))
        window.close()
      }
    )
  }

  listChanged(data) {
    const { dispatch } = this.props

    dispatch(listActions.setActive(data.value))
  }

  async handleSaveToReadingList() {
    await saveToReadingListAsync()
    window.close()
  }

  render() {
    const { lists } = this.props

    const options = lists.records.map(record => {
      return {
        key: record.id,
        text: record.name,
        value: record.id,
        icon: record.icon
      }
    })

    return (
      <div className="ui grid container">
        <div className="ui one wide column">
          <Button primary onClick={() => this.handleSaveToReadingList()}>
            Save to Reading List
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App)
