<template>
    <v-dialog transition="dialog-bottom-transition" width="auto" v-if="!dialog_flg">
        <template v-slot:activator="{ props }">
        <v-btn v-bind="props" style="text-transform: none">Google Cloud Credentialを登録</v-btn> 
        </template>
        <template v-slot:default="{ isActive }">
            <v-card width="800">
                <v-toolbar title="Google Cloud Credentialを登録"></v-toolbar>
                <div>
                    <form @submit.prevent="submit">
                        <div>
                            <file-pond
                            name="test"
                            ref="pond"
                            label-idle="jsonファイルをアップロード"
                            allow-multiple="false"
                            allowRevert="false"
                            accepted-file-types='application/json'
                            :files="myFiles"
                            :server="myServer"
                            />
                        </div>
                    </form>
                </div>
                <v-card-actions class="justify-end">
                    <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
                </v-card-actions>
            </v-card>
            <p>test</p>
        </template>
    </v-dialog>
</template>

<script>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import { useAuthStore } from '@/store';
import axios from 'axios';

// Create component
const FilePond = vueFilePond();

export default {
    name: "FilePondDemo",
    data() {
        return {
        dialog_flg:false,
        myFiles: [],
        myServer: {
            process: (fieldName, file, metadata, load, error, progress, abort) => {

            const authStore = useAuthStore();
            const data = new FormData()
            data.append('file', file)
            console.log("data=", data)
            const config = {
                headers:{
                    'Authorization':'Bearer '+authStore.token,
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (e) => {
                    progress(e.lengthComputable, e.loaded, e.total)
                },
            }


            if (file.lastModified) {
                axios.post("https://backend-vywov25xua-as.a.run.app/user/upload_google_credential", data, config)
                .then(response => {
                    load()
                    setTimeout(function(){this.dialog_flg=true}, 3000);
                })
                .catch((err) => {
                    console.log("Error = ", err)
                    error('ファイルフォーマットが正しいか確認してください。')
                })
            } else {
                /* this is used for edit form / show files uploaded */
                /* get metadata & save in vuex store */
                /*this.saveUploadFile({ 
                id: metadata.id, 
                name metadata.name, 
                url: metadata.url,
                size: metadata.size
                })*/
                console.log("edit");
                console.log(metadata);
                load(metadata.id);
            }
            },
        },
        };
    },
    components: {
        FilePond,
    },
};
</script>