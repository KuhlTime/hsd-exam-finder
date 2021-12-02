<template>
  <input
    ref="input"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    @input="updateValue"
    @focus="updateFocus(true)"
    @blur="updateFocus(false)"
    @keydown="keyDownHandler"
    :disabled="disabled"
    :class="classes"
  />
</template>

<script>
export default {
  name: 'Component',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    formatter: {
      type: Function,
      default: (value) => value
    },
    escapable: {
      type: Boolean,
      default: true
    },
    escapeOnEnter: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFocused: false
    }
  },
  computed: {
    classes() {
      return {
        error: this.error,
        'full-width': this.fullWidth
      }
    }
  },
  emits: ['update:modelValue', 'update:focused', 'enter', 'escape'],
  methods: {
    updateValue(event) {
      const value = event.target.value
      const formattedValue = this.formatter(value)
      this.$emit('update:modelValue', formattedValue) // previously was `this.$emit('input', title)`
    },
    keyDownHandler(event) {
      const keyCode = event.code

      switch (keyCode) {
        case 'Escape': {
          // On safari pressing the escape key will exit full screen mode
          // prevent that by disableing the default behavior
          event.preventDefault()
          this.$emit('escape')
          if (this.escapable) this.blur()
          break
        }
        case 'Enter': {
          this.$emit('enter')
          if (this.escapeOnEnter) this.blur()
          break
        }
        default:
          break
      }
    },
    updateFocus(value) {
      this.isFocused = value
    },
    blur() {
      this.$refs.input.blur()
    },
    clear() {
      this.updateValue('')
    }
  }
}
</script>

<style scoped>
input {
  /* Position */
  padding: 8px 12px;

  /* Display */
  box-sizing: border-box;

  /* Styling */
  color: black;
  background-color: rgb(229, 229, 229);
  border: none;
  border-radius: 4px;
  outline: none;

  /* Transistion */
  transition: all ease-in-out 120ms;

  /* Safari */
  -webkit-appearance: none;
}

input.full-width {
  /* Display */
  width: 100%;
}

input:hover:not(:disabled):not(:focus):not(.error) {
  /* Style */
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}

input:focus {
  /* Style */
  box-shadow: inset 0 0 0 1px #000;
}

input:disabled {
  /* Style */
  color: rgb(140, 140, 140);

  /* Interaction */
  user-select: none;
}

.error {
  /* Style */
  box-shadow: inset 0 0 0 1px rgba(255, 0, 0, 0.8);
  background-color: rgba(255, 0, 0, 0.1);
}

.error:hover {
  /* Style */
  box-shadow: inset 0 0 0 1px rgba(255, 0, 0, 0.5);
}
</style>
