import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, Button } from 'semantic-ui-react'
import * as listActions from 'Shared/actions/listActions'
import Chrome from 'Utilities/chrome';
import 'semantic-ui-css/semantic.min.css'

import { submitURL } from '../../modules/ajax'

class App extends React.Component {
  constructor() {
    super();

    this.chrome = new Chrome();
    this.handleSaveToReadingList = this.handleSaveToReadingList.bind(this);
  }

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
    await this.chrome.saveToReadingListAsync()
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
      <div className="ui grid divided container">
        <div className="ui one wide column">
          <br />
          <Dropdown
            onChange={(_evt, data) => this.listChanged(data)}
            selection
            placeholder="Select List"
            options={options}
            defaultValue={this.optionWithDefaultValue(options)}
          />
          <div className="ui divider" />
          <Button primary onClick={() => this.submitCurrentURL()}>
            Save
          </Button>
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
