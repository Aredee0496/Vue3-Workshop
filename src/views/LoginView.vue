<template>
  <v-container class="h-screen d-flex align-center justify-center" fluid>
      <v-col cols="12" sm="8" md="6" lg="4" class="mx-auto">
        <v-card class="px-6 py-8" elevation="4">
          <v-form
            v-model="form"
            @submit.prevent="onSubmit"
          >
          <v-card-title class="text-h6 text-center">เข้าสู่ระบบ</v-card-title>
            <v-text-field
              v-model="username"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              label="Username"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="password"
              :readonly="loading"
              :rules="[required]"
              label="Password"
              placeholder="Enter your password"
              clearable
              type="password"
            ></v-text-field>

            <br>

            <v-btn
              :disabled="!form"
              :loading="loading"
              color="primary"
              size="large"
              type="submit"
              variant="elevated"
              block

            >
              Log In
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
  </v-container>
</template>

<script setup lang="ts">
import authApi from '@/services/api/features/auth.ts'

const loading = ref<boolean>(false)
const form = ref<boolean>(false)
const username = ref<string>('')
const password = ref<string>('')
const router = useRouter()
const required = (value: string): string | boolean => !!value || 'Required.'

interface LoginBody {
    username: string
    password: string
  }
  interface LoginRes {
    token: string
  }

async function onSubmit(): Promise<void> {
  try{
  const body = { username: username.value, password: password.value };
  const response = await authApi.login<LoginBody, LoginRes>(body);
  console.log(response)
  localStorage.setItem('auth_token', response.token)
  console.log('Login successful:', response)
  router.push({ name: 'HomeView' })
  }catch (error) {
  console.error('Login failed:', error)
  }
}
</script>

<style lang="scss" scoped>

</style>
