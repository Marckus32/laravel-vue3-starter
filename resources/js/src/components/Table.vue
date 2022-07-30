<template>
    <div class="table-responsive">
        <table class="table table-bordered table-striped">
            <thead>                
                <tr>
                    <th 
                        v-for="(cell, i) in tableHeader" 
                        :key="i"
                        @click="sort(cell.sortingField ? cell.sortingField : cell.key,cell.sortable)"
                        :class="[
                            cell.name && 'min-w-125px',
                            cell.sortable !== false && 'sorting',
                            tableHeader.length - 1 === i && 'text-end',
                            currentSort === `${cell.sortingField ? cell.sortingField : cell.key}desc` && 'sorting_desc',
                            currentSort === `${cell.sortingField ? cell.sortingField : cell.key}asc` && 'sorting_asc',
                        ]"
                        tabindex="0"
                        rowspan="1"
                        colspan="1"
                        style="cursor: pointer"
                    >{{ cell.name }}</th>
                </tr>                 
            </thead>
            <tbody class="fw-bold text-gray-600">
                <template v-if="getItems.length">
                    <template v-for="(item, i) in getItems" :key="i">
                        <tr class="odd">
                            <template v-for="(cell, i) in tableHeader" :key="i">
                                <td :class="{ 'text-end': tableHeader.length - 1 === i }">
                                    <slot :name="`cell-${cell.key}`" :row="item">
                                        {{ item[prop] }}
                                    </slot>
                                </td>
                            </template>
                        </tr>
                    </template>
                </template>
                <template>
                    <tr class="odd">
                        <td colspan="7" class="dataTables_empty">{{ emptyTableDataText }}</td>
                    </tr>
                </template>
            </tbody>
            <div v-if="loading" class="overlay-layer card-rounded bg-dark bg-opacity-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </table>        
    </div>
    <el-pagination
          v-model:current-page="pagination.page"
          @current-change="currentPageChange"
          :page-size="pagination.rowsPerPage"
          layout="prev, pager, next"
          :total="pagination.total"
          :hide-on-single-page="false"
          background
        >
    </el-pagination>
    <!-- :hide-on-single-page change false to true -->
</template>

<script>
import { computed,defineComponent,ref,onMounted,watch,getCurrentInstance, } from 'vue'
import arraySort from "array-sort";

export default defineComponent({
    emit: ["current-change", "sort", "items-per-page-change"],
    props: {
        tableHeader: {type: Array, required: true},
        tableData: {type: Array, required: true},
        emptyTableDataText: { type: String, required: false, default: "No data found." },
        loading: { type: Boolean, default: false },
        currentPage: { type: Number, default: 1 },
        enableItemsPerPageDropdown: { type: Boolean, default: true },
        total: { type: Number, default: 0 },
        rowsPerPage: { type: Number, default: 10 },
        order: { type: String, default: "asc" },
        sortLabel: { type: String, default: "" },
    },
    setup(props, { emit }) {
        const data = ref(props.tableData);
        const currentSort = ref("");
        const order = ref(props.order);
        const label = ref(props.sortLabel);
        const pagination = ref({
            page: props.currentPage,
            total: props.total,
            rowsPerPage: props.rowsPerPage,
        });

        const vnodeProps = getCurrentInstance()?.vnode.props || {};

        watch(data.value, () => {
        if ("onCurrentChange" in vnodeProps) {
            currentSort.value = label.value + order.value;
        } else {
            pagination.value.total = data.value.length;
        }
        });

        onMounted(() => {
            currentSort.value = label.value + order.value;
            pagination.value.total = props.total ? props.total : data.value.length;
            pagination.value.rowsPerPage = props.rowsPerPage;
        });

        const getItems = computed(() => {
            if ("onCurrentChange" in vnodeProps) {
                return data.value;
            } else {
                const clone = JSON.parse(JSON.stringify(data.value));
                const startFrom =
                pagination.value.page * pagination.value.rowsPerPage -
                pagination.value.rowsPerPage;
                return clone.splice(startFrom, pagination.value.rowsPerPage);
            }
        });

        const currentPageChange = (val) => {
        if ("onCurrentChange" in vnodeProps) {
            emit("current-change", val);
        } else {
            pagination.value.page = val;
        }
        };

        const sort = (columnName, sortable) => {
        if (sortable === false) {
            return;
        }

        if ("onSort" in vnodeProps) {
            if (order.value === "asc") {
            order.value = "desc";
            emit("sort", { columnName: columnName, order: "desc" });
            } else {
            order.value = "asc";
            emit("sort", { columnName: columnName, order: "asc" });
            }
        } else {
            if (order.value === "asc") {
            order.value = "desc";
            arraySort(data.value, columnName, { reverse: false });
            } else {
            order.value = "asc";
            arraySort(data.value, columnName, { reverse: true });
            }
        }
        currentSort.value = columnName + order.value;
        };

        const setItemsPerPage = (event) => {
        if ("onItemsPerPageChange" in vnodeProps) {
            emit("items-per-page-change", parseInt(event.target.value));
        } else {
            pagination.value.rowsPerPage = parseInt(event.target.value);
        }
        };

        return {
            pagination,
            currentPageChange,
            getItems,
            sort,
            currentSort,
            setItemsPerPage,
        };
    },
})
</script>

<style scoped>
.sortable{
    cursor: pointer
}
</style>
