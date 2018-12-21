<template>
  <Modal id="keymap-modal"
         :value="isVisible"
         title="Key Bindings"
         @on-visible-change="visibleChange"
  >
    <div class="keymap">
      <table v-if="isWindows || isLinux">
        <thead>
        <tr>
          <td>Shortcut</td>
          <td>Action</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div><kbd>ctrl</kbd> + <kbd>k</kbd></div>
          </td>
          <td>Show keymap window</td>
        </tr>
        <tr>
          <td>
            <div><kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>n</kbd></div>
          </td>
          <td>Create New Board Modal</td>
        </tr>
        <tr>
          <td>
            <div><kbd>ctrl</kbd> + <kbd>shift</kbd> +<kbd>}</kbd></div>
            <div><kbd>alt</kbd> + <kbd>shift</kbd> +<kbd>}</kbd></div>
          </td>
          <td>
            Switch to the next board
          </td>
        </tr>
        <tr>
          <td>
            <div><kbd>ctrl</kbd> + <kbd>shift</kbd> +<kbd>{</kbd></div>
            <div><kbd>alt</kbd> + <kbd>shift</kbd> +<kbd>{</kbd></div>
          </td>
          <td>
            Switch to the previous board
          </td>
        </tr>
        <tr>
          <td>
            <div><kbd>ctrl</kbd> + <kbd>n</kbd></div>
          </td>
          <td>Bring focus to "Add New Item" field</td>
        </tr>
        </tbody>
      </table>
      <table v-if="isMac">
        <thead>
        <tr>
          <td>Shortcut</td>
          <td>Action</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div><kbd>⌘</kbd> + <kbd>k</kbd></div>
          </td>
          <td>Show keymap window</td>
        </tr>
        <tr>
          <td>
            <div><kbd>⌘</kbd> + <kbd>shift</kbd> + <kbd>n</kbd></div>
          </td>
          <td>Create New Board Modal</td>
        </tr>
        <tr>
          <td>
            <div><kbd>⌘</kbd> + <kbd>shift</kbd> + <kbd>}</kbd></div>
          </td>
          <td> Switch to the next board</td>
        </tr>
        <tr>
          <td>
            <div><kbd>⌘</kbd> + <kbd>shift</kbd> + <kbd>{</kbd></div>
          </td>
          <td> Switch to the previous board</td>
        </tr>
        <tr>
          <td>
            <div><kbd>⌘</kbd> + <kbd>n</kbd></div>
          </td>
          <td>Bring focus to "Add New Item" field</td>
        </tr>

        </tbody>
      </table>
    </div>
    <div slot="footer">
      <Button type="text" size="large" @click="closeModal">OK</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'KeyMapModal',
    data () {
      return {
        system: null
      }
    },
    computed: {
      isVisible () {
        return this.$store.state.modals.keymap.isVisible
      },
      isWindows () {
        return this.system.includes('win')
      },
      isMac () {
        return this.system.includes('mac')
      },
      isLinux () {
        return this.system.includes('linux')
      }
    },
    created () {
      this.system = window.navigator.platform.toLowerCase()
    },
    methods: {
      visibleChange (isVisible) {
        if (!isVisible) {
          this.closeModal()
        }
      },
      closeModal () {
        this.$store.dispatch('hideKeymapModal')
      }
    }
  }
</script>

<style scoped>

  .close-icon {
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
  }

  kbd {
    position: relative;
    display: inline-block;
    margin: 0 1px 2px;
    padding: 4px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    white-space: nowrap;
    letter-spacing: .2px;
    background: #fafafa;
    font-family: inherit;
    line-height: 1em;
    -webkit-transition: background-color .6s;
    transition: background-color .6s;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    font-weight: bold;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 4px;
  }

  thead td {
    padding: 4px 0;
  }

  tbody td {
    padding: 16px 0;
  }

  .header {
    margin-bottom: 16px;
  }

  tbody tr {
    border-bottom: 1px solid #f3f3f3;
  }

  .keymap {
    position: relative;
    width: 500px;
    height: 400px;
    border-radius: 4px;
    padding: 16px;
  }
</style>
