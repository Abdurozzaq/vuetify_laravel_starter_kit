<template>
	<div>
		<v-card>
			<v-card-title>
				Profile Settings
			</v-card-title>

			<v-card-text>
				<v-row>
					<v-col cols="12" sm="12" md="8" lg="8">
						<div class="text-h6">Avatar</div>
						<avatar-uploader/>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12" sm="12" md="8" lg="8">
						<div class="text-h6 mb-3">Profile Details</div>
						<admin-profile-details-settings/>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
	import AvatarUploader from '../../../../components/AvatarUploader.vue'
	import AdminProfileDetailsSettings from '../../../../components/AdminProfileDetailsSettings.vue'
	export default {
		components: {
			AvatarUploader,
			AdminProfileDetailsSettings
		},

	}
</script>

<style>

</style>