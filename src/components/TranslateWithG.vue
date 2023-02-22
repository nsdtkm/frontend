<template>
    <form @submit.prevent="submit">
        <div>
            <file-pond
            name="test"
            ref="pond"
            label-idle=".srtファイルをアップロードしてGoogle翻訳"
            allow-multiple="false"
            allowRevert="false"
            :files="myFiles"
            :server="myServer"
            />
        </div>
    </form>
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
        myFiles: [],
        myServer: {
            process: (fieldName, file, metadata, load, error, progress, abort) => {

            const authStore = useAuthStore();
            const data = new FormData()
            data.append('uploaded_file', file)
            console.log("data=", data)
            const config = {
                responseType:'arraybuffer',
                headers:{
                    Authorization:'Bearer '+authStore.token,
                },
                onUploadProgress: (e) => {
                    progress(e.lengthComputable, e.loaded, e.total)
                },
            }

            if (file.lastModified) {
                axios.post('https://backend-vywov25xua-as.a.run.app/translate/translate_with_google', data, config)
                .then(response => {
                    // load()
                    console.log(response.data)
                    const blob = new Blob([(response.data)])
                    const blobURL=window.URL.createObjectURL(blob)
                    let obj=document.createElement('a')
                    obj.href=blobURL
                    obj.download=(file.name).replace(".srt", "_google.zip")
                    document.body.appendChild(obj);
                    obj.click()
                    obj.parentNode.removeChild(obj)
                    load()
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