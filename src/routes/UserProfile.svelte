<script lang="ts">
import type { Profile } from "$lib/utils/types";

let {
    userProfile
}:{
    userProfile: Profile;
} =$props();
</script>

<div class="max-w-sm rounded overflow-hidden shadow-md" id="userProfile">
    <img class="w-full" id="profileImage" src={userProfile.image} alt="profile">
    <div class="px-6 py-4">
        <h2 class="font-bold text-xl mb-2" id="profileName">{userProfile.firstName+' '+ userProfile.lastName}</h2>
        <p class="text-neutral-600" id="profileEmail">{userProfile.email}</p>
    </div>
</div>