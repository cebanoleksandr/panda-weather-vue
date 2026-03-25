<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('cancel')">
      <div class="modal-content">
        <h3>{{ title }}</h3>
        <p><slot></slot></p>
        <div class="modal-actions">
          <button class="btn-confirm" @click="$emit('confirm')">{{ $t('modal.confirm') }}</button>
          <button class="btn-cancel" @click="$emit('cancel')">{{ $t('modal.cancel') }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
defineEmits(['confirm', 'cancel']);
</script>

<style scoped>
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.modal-content {
  background: white; padding: 24px; border-radius: 12px; width: 90%; max-width: 400px; text-align: center;
}
.modal-actions { display: flex; gap: 12px; margin-top: 20px; justify-content: center; }
button { padding: 10px 20px; border-radius: 6px; cursor: pointer; border: none; font-weight: bold; }
.btn-confirm { background: #ff4757; color: white; }
.btn-cancel { background: #f1f2f6; color: #2f3542; }
</style>
