<template>
  <span
    :class="{ 'cursor-pointer': !isScalar }"
    class="font-mono font-normal text-acColor"
    @click="jumpToType"
  >
    {{ typeString }}
  </span>
</template>

<script>
import { GraphQLScalarType } from "graphql"

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    gqlType: null,
    // (typeName: string) => void
    // eslint-disable-next-line vue/require-default-prop
    jumpTypeCallback: Function,
  },

  computed: {
    typeString() {
      return this.gqlType.toString()
    },
    isScalar() {
      return this.resolveRootType(this.gqlType) instanceof GraphQLScalarType
    },
  },

  methods: {
    jumpToType() {
      if (this.isScalar) return
      this.jumpTypeCallback(this.gqlType)
    },
    resolveRootType(type) {
      let t = type
      while (t.ofType != null) t = t.ofType
      return t
    },
  },
}
</script>
