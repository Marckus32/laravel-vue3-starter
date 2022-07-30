<template>    
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="card card-primary card-outline">
                    <div class="card-header">
                        <h5 class="m-0">Table</h5>
                    </div>
                    <div class="card-body">
                        <Table
                            :tableHeader="table.tableHeader"
                            :tableData="table.tableData"
                        >
                            <template v-slot:cell-id="{ row:data }">{{ data.id }}</template>
                            <template v-slot:cell-name="{ row:data }">{{ data.name }}</template>
                            <template v-slot:cell-email="{ row:data }">{{ data.email }}</template>
                            <template v-slot:cell-created_at="{ row:data }">{{ data.created_at }}</template>
                        </Table>
                    </div>
                </div>
            </div>            
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Table from '../../../components/Table.vue'

export default defineComponent({
    components:{
        Table
    },
    setup() {
        const table = ref({
            tableHeader: [
                {
                    key: "id",
                    name: "ID"
                },
                {
                    key: "name",
                    name: "Name"
                },
                {
                    key: "email",
                    name: "Email"
                },
                {
                    key: "created_at",
                    name: "Created At"
                },
            ],
            tableData: [
                {
                    id          : 1,
                    name        : "Marckus Balingit",
                    email       : "marckus.balingit32@gmail.com",
                    created_at  : "2022-07-02 10:00:00",
                },
                {
                    id          : 2,
                    name        : "Annika Maeh Aro",
                    email       : "annika.maeh.aro@gmail.com",
                    created_at  : "2022-07-02 10:00:00",
                },
            ]
        })

        return {
            table
        }
    },
})
</script>
